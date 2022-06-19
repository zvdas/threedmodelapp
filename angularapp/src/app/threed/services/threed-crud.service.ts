import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Threed } from '../classes/threed.model';

@Injectable({
  providedIn: 'root'
})

export class ThreedCrudService {
  
  /*
  // API URL (JSON Server)
  baseApiUrl = "http://localhost:3000/threed";
  */

  /*
  // API URL (Node Server - MongoDB)
  baseApiUrl = "http://localhost:4000/threed/api";
  */

  // /*
  // API URL (Node Server - MongoDB)
  baseApiUrl = "https://threedmodelapp.herokuapp.com/threed/api";
  // */

  //index for render
  index!:number;

  constructor(private http: HttpClient) { }

  // send to database
  uploadModelFile(modelString: string, filename: string){  
    this.http.post(this.baseApiUrl, {"modelstring": modelString, "filename": filename}).subscribe(
    // this.http.post<Model>(this.baseApiUrl, [modelString, filename]).subscribe(  
    (response) => console.log(response),
    (error) => console.log(error),
    () => console.log("completed")
    )
  }

  //retrieve from database
  receiveModelFile(){
    return this.http.get<Threed[]>(this.baseApiUrl);
  }

  //get index from threed-list
  getIndex(i: number){
    this.index = i;
  }

  // send index to threed-render
  setIndex(){
    console.log(this.index)
    return this.index;
  }

}