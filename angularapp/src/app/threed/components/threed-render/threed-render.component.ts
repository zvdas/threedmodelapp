import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Threed } from '../../classes/threed.model';
import { ThreedCrudService } from '../../services/threed-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-threed-render',
  templateUrl: './threed-render.component.html',
  styleUrls: ['./threed-render.component.css']
})

export class ThreedRenderComponent implements OnInit {

  @ViewChild('canvas')
  private canvasref!: ElementRef;

  //stage properties
  @Input() public cameraZ: number = 400;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  //helper properties
  private camera!: PerspectiveCamera;
  private get canvas(): HTMLCanvasElement{
      return this.canvasref.nativeElement;
  }
  private renderer!: WebGLRenderer;
  private scene: Scene = new Scene();
  private loader = new GLTFLoader();
  private light = new AmbientLight(0xffffff, 5);

  index!:number;
  modelfile = new Array<Threed>();
  modelString = '';

  constructor(private tcrud: ThreedCrudService, private router: Router) { }

  ngOnInit(): void {
    this.index = this.tcrud.setIndex();
    this.getModelList();
  }

  getModelList(){
    this.tcrud.receiveModelFile().subscribe(
        (response) => {this.modelfile = response},
        (error) => console.log(error),
        () => console.log("completed")
    )
  }

  //create the scene
  private createScene(){
    // scene
    this.modelString = this.modelfile[this.index].modelstring;
    this.loader.load("data:application/octet-stream;base64,"+this.modelString, (gltf)=>{
    this.scene.background = new Color(0x000000);
    this.scene.add(gltf.scene);
    this.light.position.set(5,5,5);
    this.scene.add(this.light);
    console.log(`gltf : ${gltf}`);
    },(xhr)=>{
    console.log(`${(xhr.loaded/xhr.total*100)}% loaded`);
    }, (error)=>{
    console.log(`gltf loading error : ${error}`);
    });
    //camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new PerspectiveCamera(
    this.fieldOfView,
    aspectRatio,
    this.nearClippingPlane,
    this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio(){
    return this.canvas.clientWidth/this.canvas.clientHeight;
  }

  //start the rendering loop
  private startRenderingLoop(){
    //renderer
    this.renderer = new WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    let component: ThreedRenderComponent = this;
    (function render(){
    requestAnimationFrame(render);
    controls.update();
    component.renderer.render(component.scene, component.camera);
    }());
  }

  render(){
    this.createScene();
    this.startRenderingLoop();
  }

  return(){
    this.router.navigate(['/']);
  }

}