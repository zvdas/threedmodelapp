import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreedRenderComponent } from './threed/components/threed-render/threed-render.component';
import { ThreedUploadComponent } from './threed/components/threed-upload/threed-upload.component';

const routes: Routes = [
  {path:'', component:ThreedUploadComponent},        
  {path:'render', component:ThreedRenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }