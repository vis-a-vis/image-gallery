const mongoose = require('mongoose');
const faker = require('faker');
const schema = mongoose.schema;
mongoose.connect('mongodb://localhost/imageGallery');


const generateId = function() {
  //faker.seed(100);
  var id = faker.fake("{{random.number}}");
  return id;
};

const generateHouseId = function() {
  //faker.seed(300);
  var houseId = faker.fake("{{random.number}}");
  return houseId;
};

const generateLinkUrl = function() {
  var link_url = faker.fake("{{image.imageUrl}}");
  return link_url;
};

const generateDescription = function() {
  var description = faker.fake("{{lorem.sentence}}");
  return description;
};

const generateImageCount = function() {
  //faker.seed(1000);
  var imageCount = faker.fake("{{random.number}}");
  return imageCount;
}
//var secondRandom = faker.random.number();

let documentList = [];

const populateData = function() {
  for(var i=0; i<100; i++) {
    var item = {
      id : generateId(),
      houseid : generateHouseId(),
      Link_url : generateLinkUrl(),
      Description : generateDescription(),
      Image_count : generateImageCount()
    };
    documentList.push(item);
  }
};
populateData();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

//define image schema
var imageSchema = mongoose.Schema({
  id : Number,
  houseid : Number,
  Link_url : String,
  Description : String,
  Image_count : Number
});

//compile the schema into a model

var Image = mongoose.model('Image', imageSchema);

let saveList = (documentList, cb) => {
  for(var i=0; i<documentList.length; i++) {
    const newImg = new Image({
      id : documentList[i].id,
      houseid : documentList[i].houseid,
      Link_url : documentList[i].Link_url,
      Description : documentList[i].Description,
      Image_count : documentList[i].Image_count
    });
    newImg.save(cb);
  }
};

saveList(documentList, (err, image) => {
  if (err) {
    console.log(err);
  } else {
    console.log('image', image);
  }
});

let find  = (callback) => {
  Image.find({}).sort('-size').limit(5).exec(callback);
};

module.exports.saveList = saveList;
module.exports.documentList = documentList;
module.exports.find = find;

/*
{
“_id”: “1”,
“_houseid”: “4566”,
“Link_url”: “http://www.aws.images/6787886/”,
“Description”: “Manhattan Lux Loft.Like.Love.Lots.Look !”,
“Image_count”: “1”
}
*/

/*
const mongoose = require('mongoose');
// const fs = require('fs');
const faker = require('faker');
const Schema = mongoose.schema; // added this line
mongoose.connect('mongodb://localhost/fetcher');
const shopsAvalAtArr = ['COSTCO', 'Wallmart', 'Target', 'FRYs Electronics', 'AdoramaCamera'];
const generateIdFunc = function () {
 return Math.floor(Math.random() * Math.floor(5000));
};
const generatePriceFunc = function () {
  var a =  Math.floor(Math.random() * Math.floor(5000));
 return faker.commerce.price(.10,a,2,"$");
};
const generateDeliveryCostFunc = function () {
 return 'Free delivery';
};
const generateRandomDate = function (start, end) {
 for (var i =0 ; i < 100; i++) {
   var dateNew = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
   return dateNew;
 }
};
const generateDescFunc = function () {
 return (faker.commerce.productName());
};
const generateRatingNum = function() {
 return Math.floor(Math.random() * Math.floor(1000));
};
const generateShopSelect = function () {
 var max = shopsAvalAtArr.length
 var indexNum = Math.floor(Math.random(0) * Math.floor(max));
 return shopsAvalAtArr[indexNum];
}
// const imgPathArr = [];
// const generateImagePath = function () {
//   for (var i = 0; i < 90; i++) {
//      // var img_var = "hrsf99" + "\/" + "expressal-similar-Items-service" + "\/" + "images" + "\/" + "image-[" + i + "].png";
//      var img_var =   "\/" + "images" + "\/" + "image-[" + i + "].png";
//      imgPathArr.push(img_var);
//   }
//      return imgPathArr;
// }
// generateImagePath();
let itemList = [];
const populateData = function () {
 for (var i =0 ; i < 100; i++) {
   var item = {
     id: generateIdFunc(),
     price: generatePriceFunc(),
     deliveryCost: generateDeliveryCostFunc(),
     dateOfDelivery: generateRandomDate(new Date(2012, 0, 1), new Date()),
     desc: generateDescFunc(),
     rating: generateRatingNum(),
     shopsAvalAt: generateShopSelect(),
     // imgPath: imgPathArr[i]
   }
   itemList.push(item);
 }
}
populateData();
let prodSchema = mongoose.Schema({
 id : Number,
 price: String,
 deliveryCost: String,
 dateOfDelivery: String,
 desc: String,
 rating: Number,
 shopsAvalAt: String,
 // img: { data: Buffer, contentType: String }
 // img: String
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
 console.log('we are connected!');
});
let Prod = mongoose.model('Prod', prodSchema);
let saveList = (itemList, cb) => {
 for (let i = 0; i < itemList.length; i++) {
   const newProd = new Prod ({
   id: itemList[i].id,
   price: itemList[i].price,
   deliveryCost: itemList[i].deliveryCost,
   dateOfDelivery: itemList[i].dateOfDelivery,
   desc: itemList[i].desc,
   rating: itemList[i].rating,
   shopsAvalAt: itemList[i].shopsAvalAt,
   // img: {data: fs.readFileSync(itemList[i].imgPath),
   //       contentType : 'image/png' }
   });
 newProd.save(cb);
 }
}
saveList(itemList, (err, product) => {
 if (err) {
   console.log(err);
 } else {
   console.log('prod', product);
 }
});
fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});
let find  = (callback) => {
 Prod.find({}).sort('-size').limit(5).exec(callback);
};
module.exports.saveList = saveList;
module.exports.itemList = itemList;
module.exports.find = find;
*/
