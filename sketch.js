var database;
var dog,sadDog,happyDog, milk, milkImage, eatingFood, eatingFoodimage;

var feed, add, foodobj;

var foodS, foodStock;

var fedtime;

var lastfed;

var groun;
var  groun2;

var submit;

var greeting2;

var input;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  milkImage = loadImage('Images/milkImage.png');
  eatingFoodimage = loadImage("Images/eating food.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodobj = new Food();

  groun = createSprite (500,330,1000,20);
  groun.visible = false;

  greeting2 = createElement('h3');
  greeting2.position(250,150);


  groun2 = createSprite (1000,330,20,500); 
  groun2.visible = false;
  

  milk = createSprite(620, 45);
  milk.addImage(milkImage);
  milk.scale = 0.08;

  eatingFood = createSprite(430, 45);
  eatingFood.addImage(eatingFoodimage);
  eatingFood.scale = 0.1;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock)

  feed = createButton("Feed Dog");
  feed.class("customButton");
  feed.position(660,95);
  feed.mousePressed(feedDog);


  add = createButton("Add Food");
  add.class("customButton");
  add.position(800,95);
  add.mousePressed(addFoods);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  submit = createButton("Submit");
  submit.class("customButton");
  submit.position(250,105);
  submit.mousePressed(readname);
  
  nameBox = createInput('').attribute('placeholder','Your pet name');
  nameBox.position(250,100);
}

function draw() {
  background(46,139,87);

  foodobj.display();

  dog.collide(groun);
  dog.collide(groun2);

  fedtime = database.ref('FeedTime');
  fedtime.on("value", function(data){
    lastfed = data.val();
  })

  dog.velocityY = dog.velocityY + 0.8;
  dog.velocityX = dog.velocityX + 0.8;

  drawSprites();

  fill(255, 255, 254);
  textSize(15);
  if(lastfed >= 12){
text("Last Fed : " + lastfed%12 + "PM", 250, 30);
  }else if(lastfed == 0){
text("Last Fed : 12 PM", 250, 30);
  }else{
text("Last Feed : " + lastfed + "PM", 250, 30);
  }
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodobj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){

  dog.addImage(happyDog);
  dog.x =600;
  dog.y = 150;

  input = nameBox.value();

  greeting2.html("now " + input + " is not hugry!");

    foodobj.updateFoodStock(foodobj.getFoodStock()-1);
    database.ref('/').update({
    Food : foodobj.getFoodStock(),
    FeedTime: hour()
    })

}

//function to add food in stock
function addFoods(){
foodS++;
database.ref('/').update({
  Food: foodS
})
}

function readname(){

 input = nameBox.value();

  nameBox.hide();
  submit.hide();

  var greeting = createElement('h3');
  greeting.html("Wow! " + input + " name is too nice");
  
  greeting2.html(input + " is hugry!");
  greeting.position(250,100);

}