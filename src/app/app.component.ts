import {Component, OnInit} from '@angular/core';
import {DateTime} from "luxon";
import {AlfrescoService} from "./alfresco.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ACR';
  ranges: any[] = [ // formato DHHMM
    { id: 1, from: 22100, to: 22359 },
    { id: 2, from: 30000, to: 32359 },
    { id: 3, from: 41200, to: 41500 },
    { id: 4, from: 42030, to: 42200 }
  ]
  emozioni: { [name: string]: string } = {
    "Felice": "😄",
    "Amorevole": "🥰",
    "Triste": "🙁",
    "Rabbioso": "😤",
    "Preoccupato": "😱",
    "Disinvolto": "😏",
    "Indeciso": "🧐",
    "Euforico": "🤩",
    "Festoso": "🥳",
    "Distrutto": "🫩",
    "Commosso": "🥹"
  }
  emozione: string = "";
  // data corrente
  currentDate: number = 0;
  // se abilito voto, setto anche rangeId (sessione)
  enableVote: boolean = false;
  rangeId: number = 0;
  // dati utente
  userName: string = localStorage.getItem("name") || "";
  userId: string = localStorage.getItem("id") || "";
  // disabilito tasti per evitare doppio click
  disableInput: boolean = false;

  constructor(private alfresco: AlfrescoService) {
  }

  ngOnInit(){
    this.checkDate();
  }

  checkDate(){
    // definisco se sono in una fascia oraria in cui abilito i tasti
    let iso = DateTime.now().toISO();
    iso = iso.substring(9, 16).replace("T", "").replace(":", "");
    this.currentDate = parseInt(iso);
    console.log(`Current Date: ${this.currentDate}`);
    for (let range of this.ranges) {
      if(this.currentDate > range.from && this.currentDate < range.to) {
        this.rangeId = range.id;
        this.enableVote = true;
        console.log("Voto abilitato");
      }
    }
  }

  reload() {
    location.reload();
  }

  salvaNome() {
    if(this.userName){
      if(!this.alfresco.root){
        alert("Errore. Chiama Federico!");
        return;
      }
      this.disableInput = true;
      let id = this.randomString(4)+new Date().getTime();
      this.alfresco.nodesApi?.createNode(this.alfresco.root, {
        name: id,
        nodeType: "cm:folder",
        properties: {
          "cm:title": this.userName
        }
      }).then(() => {
        // è andato bene, salvo tutto
        this.userId = id;
        localStorage.setItem("id", this.userId);
        localStorage.setItem("name", this.userName);
      }).catch(() => {
        alert("Errore. Chiama Federico!");
        return;
      }).finally(()=>{
        this.disableInput = false;
      });
    } else {
      alert("Non hai inserito il nome!");
    }
  }

  salvaEmozione(){
    if(this.emozione){
      if(!this.alfresco.root){
        alert("Errore. Chiama Federico!");
        return;
      }
      // salvo
      this.disableInput = true;
      this.alfresco.nodesApi?.getNode(this.alfresco.root, {
        relativePath: this.userId+"/"+this.userId+"_"+this.rangeId
      }).then(node => {
        if(node){
          this.disableInput = false;
          alert("Hai già votato, attendi la prossima votazione");
        }
      }).catch(e => {
        // non ha votato, creo voto
        this.alfresco.nodesApi?.createNode(this.alfresco.root, {
          name: this.userId+"_"+this.rangeId,
          nodeType: "cm:content",
          relativePath: this.userId,
          properties: {
            "cm:description": this.emozione
          }
        }).then(()=>{
          alert("Voto registrato con successo");
          location.reload();
        }).finally(()=>{
          this.disableInput = false;
        });
      });
    } else {
      alert("Scegli un'emozione!");
    }
  }

  randomString(length: number) {
    let chars = "abcdefghijklmnopqrstuvwxyz"
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

}
