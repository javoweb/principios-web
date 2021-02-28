import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlbumListarComponent} from './album/album-listar/album-listar.component';
import {CollectorListarComponent} from './collector/collector-listar/collector-listar.component';

const routes: Routes = [
  { path: 'albums', component: AlbumListarComponent },
  { path: 'collectors', component: CollectorListarComponent },
  { path: '',   redirectTo: 'albums', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
