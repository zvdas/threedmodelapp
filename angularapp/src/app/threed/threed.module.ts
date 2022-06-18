import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ThreedListComponent } from './components/threed-list/threed-list.component';
import { ThreedUploadComponent } from './components/threed-upload/threed-upload.component';
import { ThreedRenderComponent } from './components/threed-render/threed-render.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ThreedListComponent,
    ThreedUploadComponent,
    ThreedRenderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ThreedModule { }
