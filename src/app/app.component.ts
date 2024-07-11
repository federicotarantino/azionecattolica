import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'cisaro';
  @ViewChild('mainInput') input!: ElementRef;
  squadra: string = "";
  frase: string = "";
  timeout: any;

  ngOnInit(){
    this.squadra = "logo";
    this.setFrase();
  }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  getClass() {
    return "container-fluid "+this.squadra;
  }

  scegliSquadra() {
    this.squadra = atob(this.input.nativeElement.value);
    this.setFrase();
    this.input.nativeElement.value = "";
    if(this.timeout){
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(()=>{
      this.squadra = "logo";
      this.setFrase();
    }, 10000);
  }

  setFrase(){
    if(this.squadra=="logo"){
      this.frase = "Verifica Carta";
    } else if(this.squadra=="chef"){
      this.frase = "Sei nella BRIGATA CHEF";
    } else if(this.squadra=="bimbi"){
      this.frase = "Sei un Toad aiutante con tanto TEMPO LIBERO";
    } else if(this.squadra=="prete"){
      this.frase = "Addetto alle Confessioni: il vostro DON EGIDIO";
    } else {
      this.frase = "Sei nel gruppo "+this.squadra.toUpperCase();
    }
  }
}
