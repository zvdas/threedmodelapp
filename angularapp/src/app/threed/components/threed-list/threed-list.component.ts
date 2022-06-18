import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Threed } from '../../classes/threed.model';
import { ThreedCrudService } from '../../services/threed-crud.service';

@Component({
  selector: 'app-threed-list',
  templateUrl: './threed-list.component.html',
  styleUrls: ['./threed-list.component.css']
})

export class ThreedListComponent implements OnInit {

  modelfile = new Array<Threed>();
  
  constructor(private tcrud: ThreedCrudService, private router: Router) { }

  ngOnInit(): void {
    this.getModelList();
  }

  getModelList(){
    this.tcrud.receiveModelFile().subscribe(
        (response) => {this.modelfile = response},
        (error) => console.log(error),
        () => console.log("completed")
    )
  }

  render(i: number){
      this.tcrud.getIndex(i);
      this.router.navigate(['/render']);
  }

}