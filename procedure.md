3D Model App

FRONTEND

Objective : Upload model file to dummy API (JSON) server, retrieve filenames to list & render selected file (model).

Steps:
1. Create a new angular app using following command
    ng new modelapp

2. Install boostrap for Responsive Wed Design (RWD) by using the following command
    npm i bootstrap

3. Add the following import to the styles.css file
    @import '~bootstrap/dist/css/bootstrap.min.css';

4. Add the following import to the main.ts file
    import 'bootstrap/dist/js/bootstrap.bundle.min.js';

5. Generate new module in app folder using following command
    ng g m threed -m=app

6. Generate new components in model module using the following command
    ng g c threed/threedList
    ng g c threed/threedUpload
    ng g c threed/threedRender

7. Generate new service in app folder for model upload & retrieve
    ng g s threed/services/threedCrud

8. Open src/app folder and start editing app.component.html file
    <router-outlet></router-outlet>

9. Start the app on local server on default port 4200 and open in browser by using the following command
    ng serve --open

10. Start a json server on localhost which will store the model using the following command
    json-server --watch .\src\app\files\model.json

11. Start editing the model.json file
    {
        "threed": []
    }

12. Generate a class using the following command
    ng g cl threed/classes/threed --type=model

13. Start editing the threed.class.ts file
    export class Threed {
        modelstring:string;
        filename:string;

        constructor(modelstring:string, filename:string){
            this.modelstring = modelstring;
            this.filename = filename;
        }
    }

14. Start editing the app-routing.module.ts file to add a route 'render' matched to component ThreedRenderComponent
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { ThreedRenderComponent } from './model/threed-render/threed-render.component';

    const routes: Routes = [
    {path:'', component:ThreedUploadComponent},        
    {path:'render', component:ThreedRenderComponent}
    ];

    @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })

    export class AppRoutingModule { }

15. import { HttpClientModule } from '@angular/common/http' in the app.module.ts file

16. Open src/app/services and start editing threed-crud.service.ts file
    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { Threed } from '../classes/threed.model';

    @Injectable({
    providedIn: 'root'
    })

    export class ThreedCrudService {

        // API URL (JSON Server)
        baseApiUrl = "http://localhost:3000/model";

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


17. Open src/app/threed/components/threed-upload folder and start editing threed-upload.component.ts file
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

18. Open src/app/model/threed-upload and start editing threed-upload.component.html file.
    <div class="container col-8 my-5">
        <div class="card bg-secondary p-3">
            <div class="form-group">
                <label for="name">Name</label>
                <input [(ngModel)]="filename" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label for="file">File</label>
                <input id="file" type="file" class="form-control" (change)="onFileChange($event)">
            </div>
            <button class="btn btn-primary my-2" (click)="submit()">Submit</button>
            <p class="text-white text-center">{{ msg }}</p>
        </div>
    </div>
    <app-threed-list></app-threed-list>

19. Open src/app/model/threed-list folder and start editing threed-list.component.ts file.
    import { Component, OnInit } from '@angular/core';
    import { Router } from '@angular/router';
    import { Threed } from '../classes/threed.model';
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

20. Open src/app/model/threed-list and start editing threed-list.component.html file.
    <div class="container col-8">
        <div class="card bg-secondary">
            <table class="table table-hover table-striped text-center text-white">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">FileName</th>
                        <th scope="col">Operation</th>
                    </tr>
                </thead>
                <tbody *ngFor="let model of modelfile; let i = index">
                    <tr>
                        <th scope="row">{{ i+1 }}</th>
                        <td>{{ model.filename }}</td>
                        <td><button class="btn btn-primary" (click)="render(i)">Render</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

21. Install the Three.js library for rendering 3D models and add the type to package.json by typing the following commands
    npm install three
    npm i --save-dev @types/three

22. Open src/app/model/threed-render folder and start editing threed-render.component.ts file.
    import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
    import { Threed } from '../classes/threed.model';
    import { ThreedCrudService } from '../../services/threed-crud.service';
    import { AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { Router } from '@angular/router';

    @Component({
    selector: 'app-threed-render',
    templateUrl: './threed-render.component.html',
    styleUrls: ['./threed-render.component.css']
    })

    export class ThreedRenderComponent implements OnInit/*, AfterViewInit*/ {

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
        private light = new AmbientLight(0xffffff, 1);

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

23. Open src/app/model/threed-render and start editing threed-render.component.html file.
    <div class="container">
        <div class="card bg-secondary m-5">
            <div class="row text-center">
                <div class="col-6 my-2">
                    <button class="btn btn-primary" (click)="render()">Render</button>
                </div>
                <div class="col-6 my-2">
                    <button class="btn btn-primary" (click)="return()">Return to List</button>
                </div>
            </div>
            <div class="row text-center text-white">
                <p>Once the render button is clicked, scroll up & down with mouse to zoom in & out and move  mouse to rotate the rendered object below</p>
            </div>
        </div>
        
        <canvas #canvas id="canvas" style="height: 100%; width: 100%;"></canvas>
    </div>

24. Add a background image by entering the URL in the styles.css file
    body{
        background-image: url('https://i.pinimg.com/564x/ef/ae/76/efae76f6c3f2b985090afa1f50900af8.jpg');
    }

BACKEND

Objective : MongoDB connection to the current Angular app will be made with Node.js Express.

Steps: 
1. Create a folder called mongodb-nodejs to store the backend files & folders.

2. Initialize the directory by typing the following command
    npm init -y

3. Install the modules express, mongoose (MongoDB schema), nodemon (run uninterrupted) & multer (file upload) by typing the following command
    npm install express mongoose nodemon multer

4. Create a file index.js and edit the file
    const express = require("express");

    const app = express();

    // parse requests of content-type - application/json
    app.use(express.json({ limit: '50mb' }));

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    app.get("/", (req, res) => {
        res.json({message : "Welcome to the 3D Model Application"});
    })

    app.listen(4000, ()=>{
        console.log("The Server is listening on port 4000");
    })

5. Start the server by typing the following command and open link in browser
    npm start

    Configure MongoDB database & Mongoose
6. In the app folder, create a separate configurations folder for configuration with database.js file and edit the file
    const mongoose = require("mongoose");
    
    //local
    var url = 'mongodb://localhost:27017/threedm_db';

    //shared cluster
    var url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(url, (err) => {
        if(!err){
            console.log("Connection to MongoDB Successful");
        }else{
            console.log(`Connection to MongoDB Failed with error : ${JSON.stringify(err, undefined, 2)}`);
        }
    })

    module.exports = mongoose;

7. Define the Mongoose model in the threed.model.js file in app/models folder
    const mongoose = require("mongoose");

    var schema = mongoose.Schema({
        modelstring: { type: String },
        filename: { type: String }
    }, {
        timestamps : true
    });

    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    var threedm = mongoose.model("threed", schema);

    module.exports = { threedm };

8. Mongoose model supports all CRUD functions, hence don't have to be entered separately. Inside app/controllers folder, create threed.controller.js with the Read function
    const { threedm } = require("../models/threed.model");

    //Retrieve all the models from the database
    exports.getAll = (req, res) => {
        threedm.find((err, docs) => {
            if(!err){
                res.send(docs);
            }else{
                console.log(`Error retrieving 3D model list : ${JSON.stringify(err, undefined, 2)}`);
            }
        });
    }

9. Inside app/routes folder, create threed.routes.js with the Read function
    const threedmController = require("../controllers/threed.controller");

    const express = require("express");

    const router = express.Router();

    router.get("/api", threedmController.getAll);

    router.post("/api", threedmController.sendOne);

    module.exports = router;

10. Add the connect function to the index.js file
    const express = require("express");

    const { mongoose } = require("./configurations/database");

    var threedmRoutes = require("./routes/threed.routes");

    const app = express();

    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    app.use('/threed', threedmRoutes);

    app.get('/', (req, res) => {
        res.json({message : "Welcome to the 3D Model Application"});
    })

    app.listen(4000, ()=>{
        console.log("The Server is listening on port 4000");
    })

11. Create a file multer.js for configuring multer for uploading files
    const multer = require("multer");

    exports.upload = multer({ });

12. Inside app/controllers folder, add the Create function to threed.controller.js
    const { threedm } = require("../models/threed.model");

    // Create a new model (upload as string)
    exports.sendOne = (req, res) => {
        if(!req.body.modelstring){
            var modelString = req.file.buffer.toString('base64');
        }else{
            var modelString = req.body.modelstring;
        }
        var threed =  new threedm({modelstring: modelString, filename: req.body.filename});
        threed.save((err, doc) => {
            if(!err){
                res.send(doc)
            }else{
                console.log(`Error sending 3D model list : ${JSON.stringify(err, undefined, 2)}`);
            }
        })
    }

13. Inside app/routes folder add the Create function to threed.routes.js
    const threedmController = require("../controllers/threed.controller");

    const multerConfig = require("../configurations/multer");

    const express = require("express");

    const router = express.Router();

    router.post("/", multerConfig.upload.single('modelstring'), threedmController.sendOne);

    module.exports = router;

Currently Angular & NodeJS work independently on ports 4200 & 4000 respectively.
Objective : Integrate Angular & NodeJS

Steps:
1. Set the output directory to static folder
    Open angular.json, ensure the "outputPath" is set to dist/<project_name> ("outputPath":"dist/angularapp") so that the production files will be stored in angularapp folder in dist folder under project root directory.

2. Enter the following command
    ng build

3. Integrate Angular production with Node.js Project. In app folder of Node.js Express Project, create views folder.

4. Copy all files from Angular dist/angularapp folder to app/views folder.

5. Serve the Angular App with Express. Serve static files such as HTML files, CSS files and JavaScript files in app/views folder using the express.static() built-in middleware function. Edit the index.js file.

6. deliver index.html file using res.sendFile().
    const express = require("express");

    const { mongoose } = require("./configurations/database");

    const threedmRoutes = require("./app/routes/threed.route");

    const path = __dirname + '/app/views/';

    const app = express();

    app.use(express.static(path));

    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    app.use('/threed', threedmRoutes);

    app.get('/', (req, res) => {
        res.sendFile(path + "imdex.html")
        // res.json({message : "Welcome to the 3D Model Application"});
    })

7. Run Node Express server & Angular on the same Port by entering the following in terminal
    npm start

8. Angular App will run on port 4000 with node.js. When refreshing, 404 error occurs. To handle error, pass optional parameter useHash as true value in app-routing.module.ts.
    @NgModule({
        imports: [RouterModule.forRoot(routes, {useHash: true})],
        exports: [RouterModule]
    })

9. Run the ng build in terminal once again, delete the filoes from app/view and paste the files from static folder. The changes will be updated.

10. In order to consume API requests from Angular App, CORS (Cross Origin Resource Sharing), which allows cross application communication. Install cors using the following command
    npm i cors

11. Add cors to the index.js file. This will allow requests from any port number or domain.
    const express = require("express");

    const { mongoose } = require("./configurations/database");

    const cors = require("cors");

    const threedmRoutes = require("./app/routes/threed.route");

    const path = __dirname + '/app/views/';

    const app = express();

    app.use(express.static(path));

    // parse requests of content-type - application/json
    app.use(express.json());

    app.use(cors({ origin: 'http://localhost:4000' })); //(or 4200, depending on the port number of request maker)
Using HTTPClient, post & get requests can be made directly from the Angular application to MongoDB, using baseApiUrl = "http://localhost:4000/models";


DEPLOYMENT ON HEROKU
Objective: Host the application on Heroku with connection to MongoDB

Steps:
1. Create a new project in dashboard.heroku.com

2. Choose Connect to GitHub as the deployment method

3. Search the GitHub repository and click the connect button next to the repository

4. Click Enable Automatic Deploys

5. The deployment process will start automatically once the code is pushed to GitHub