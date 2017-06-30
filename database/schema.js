let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/favorites');

let db = mongoose.connection;

db.on('error', () => {
  console.log('could not connect to mongoDB');
})
db.once('open', () => {
  console.log('monogoDB connection established');
});


let favoriteSchema = mongoose.Schema({
  userName: String,
  finalRecipe: String
});

let imageSchema = mongoose.Schema({
  url: String,
  caption: String
});


let Favorite = mongoose.model('Favorite', favoriteSchema);
let Image = mongoose.model('Image', imageSchema);

module.exports.Favorite = Favorite;
module.exports.Image = Image;