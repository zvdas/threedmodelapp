import { Component, OnInit } from '@angular/core';
import { ThreedCrudService } from '../../services/threed-crud.service';

@Component({
  selector: 'app-threed-upload',
  templateUrl: './threed-upload.component.html',
  styleUrls: ['./threed-upload.component.css']
})

export class ThreedUploadComponent implements OnInit {

  filename:string='';
  modelString:string='';
  file!: File;
  msg:string='';

  // Inject service 
  constructor(private tcrud: ThreedCrudService) { }

  ngOnInit(): void {
  }

  // receive model file and convert to base64 string to send to database 
  onFileChange(event:any){
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsBinaryString(this.file);
      reader.onload = () => {
          this.modelString = btoa(reader.result as string);
      }
    }
  }

  //send to threed-crud.service.ts
  submit(){
    this.tcrud.uploadModelFile(this.modelString, this.filename);
    this.msg='File uploaded successfully';
  }

}