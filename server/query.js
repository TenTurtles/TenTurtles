const express = require('express');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const recipe = require('./recipeRefactor.js');
const wine = require('./wineRefactor.js');
const api = require('./config.js');
const axios = require('axios');

const apiQuery = (food, res) => {
  let finalResults = {
    finalRecipes: [],
    finalWines: []
  };
  
  axios.post('https://api.edamam.com/search?q=' + food, { "app_id": api.recipe_appId, "app_key": api.recipe_appkey })
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
};

module.exports.apiQuery = apiQuery;