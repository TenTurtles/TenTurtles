let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

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

let Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports.Favorite = Favorite;