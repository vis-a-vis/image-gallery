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

