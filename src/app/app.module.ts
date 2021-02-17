import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumModule } from './album/album.module';
import { CollectorModule } from './collector/collector.module';
import { ArtistaModule } from './artista/artista.module';
import { ArtistaComponent } from './artista/artista.component';
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
    ArtistaModule,
    ArtistaComponent
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
