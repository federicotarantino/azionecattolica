import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {LOAD_WASM, NgxScannerQrcodeModule} from "ngx-scanner-qrcode";

LOAD_WASM().subscribe();

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxScannerQrcodeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
