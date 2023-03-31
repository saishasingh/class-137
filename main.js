Status = "";
objects =[];


function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(500,300);
    canvas.center();
    
}
function draw(){
    image(video,0,0,500,480);
    if (Status != ""){
        objectDetector.detect(video,gotResults);
        for(i=0 ; i<objects.length;i++){
            document.getElementById("labelstatus").innerHTML = "Objects are detected";
            document.getElementById("labelobjects").innerHTML = "Number of objects detected are" + objects.length;

           fill("#e62031");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%" , objects[i].x,objects[i].y);
           noFill();
           stroke("#e62031");
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;

}
function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("labelstatus").innerHTML = "Objects are getting detected";

}
function modelLoaded(){
    console.log("model is loaded");
    Status =true;
    video.loop();
    video.speed(1);
    video.volume(0);
    
}