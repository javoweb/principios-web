import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumModule } from './album/album.module';
import { CollectorModule } from './collector/collector.module';
import { PerformerModule } from './performer/performer.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
   ],
  imports: [
    BrowserModule,
    AlbumModule,
    CollectorModule,
    AppRoutingModule,
    HttpClientModule,
    PerformerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
