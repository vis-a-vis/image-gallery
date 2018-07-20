var mongoose = require('mongoose');
var faker = require('faker');
mongoose.connect('mongodb://localhost/test');




var link_url = faker.fake("{{image.imageUrl}}");
faker.seed(300);
var houseId = faker.fake("{{random.number}}");
var description = faker.fake("{{lorem.sentence}}");
faker.seed(1);
var houseNo = faker.fake("{{random.number}}");
//var secondRandom = faker.random.number();

/*
{
“_id”: “1”,
“_houseid”: “4566”,
“Link_url”: “http://www.aws.images/6787886/”,
“Description”: “Manhattan Lux Loft.Like.Love.Lots.Look !”,
“House_no”: “1”
}
*/
