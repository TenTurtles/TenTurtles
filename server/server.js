const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const recipe = require('./recipeRefactor.js');
const wine = require('./wineRefactor.js');
const api = require('./config.js');
const axios = require('axios');
const Clarifai = require('clarifai');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/search', (req, res) => {
  let item = req.body.item;
  console.log('item ', item);
  let finalResults = {
    finalRecipes: [],
    finalWines: []
  };
  
  axios.post('https://api.edamam.com/search?q=' + item, { "app_id": api.recipe_appId, "app_key": api.recipe_appkey })
  .then((result) => {
    return recipe.refactor(result.data.hits);
  })
  .then(recipes => {
    return recipes.map(rec => {
      finalResults.finalRecipes.push(rec);
      return rec.ingredients.map(ingredient => {
        return ingredient.food;
      }).join(' ').split(' ');
    });
  })
  .then(ingredients => {
    return Promise.map(ingredients, ingredient => {
      return axios.post('http://138.68.58.133/pairing', {"ingredients": ingredient}).then(result => {
        return result.data;
      });
    });
  })
  .then(wines => {
    return Promise.map(wines, wineArray => {
      let random = Math.floor(Math.random() * wineArray.length);
      return axios.get('http://services.wine.com/api/beta2/service.svc/JSON/catalog?sortBy=rating|descending&apikey=' + api.wine_key, {"search": wineArray[random]}).then(result => {
        return wine.refactor(result.data.Products.List);
      });
    });
  })
  .then(wines => {
    wines.map(wine => {
      finalResults.finalWines.push(wine);
    });
  })
  .then( () => {
    res.send(finalResults);
  })
  .catch(error => {
    console.log('error: ', error);
  });
});

app.post('/clarifai', (req, res) => {
  console.log(req.body);
  let imageUrl = req.body.url;
  const clarifai = new Clarifai.App({
    apiKey: api.clarifai_key
  });

  clarifai.models
  .predict(Clarifai.FOOD_MODEL, imageUrl)
  .then((response, error) => {
    if (error) {
      console.log(error);
    } else {
      return response;
    }
  })
  .then(result => {
    return result.outputs[0].data.concepts.map(item => {
      return item.name;
    });
  })
  .then(x => {
    console.log(x);
  })

});

app.listen(3000, function() {
  console.log('Connection established.  Listening on port 3000!');
});
