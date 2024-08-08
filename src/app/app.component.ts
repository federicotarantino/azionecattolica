import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ScannerQRCodeConfig, ScannerQRCodeResult} from "ngx-scanner-qrcode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cisaro';
  mode: string = "acg"
  squadra: string = "";
  timeout: any;

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        height: window.innerHeight*0.25
      },
    }
  };

  ngOnInit(){
    this.squadra = "logo";
  }

  scegliSquadra(event: ScannerQRCodeResult[]) {
    this.squadra = atob(event[0].value);
    if(this.timeout){
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(()=>{
      this.squadra = "logo";
    }, 10000);
  }

}
