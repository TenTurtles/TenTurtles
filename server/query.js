const express = require('express');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const recipe = require('./recipeRefactor.js');
const wine = require('./wineRefactor.js');
const api = require('./config.js');
const axios = require('axios');
const exampleData = require('./exampleData.js');

const apiQuery = (data, res) => {
  let finalResults = {
    finalRecipes: [],
    finalWines: []
  };
  let url = 'https://api.edamam.com/search?q=' + data.item;
  if (data.choices) {
    let choices = data.choices;
    for (let i = 0; i < choices.length; i++) {
      url += '&health=' + choices[i];
    }
  }
  axios.post(url, { "app_id": api.recipe_appId, "app_key": api.recipe_appkey })
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
      // console.log('ingredient: ', ingredient);
      return axios.post('http://138.68.58.133/pairing', {"ingredients": ingredient}).then(result => {
        return result.data;
      });
    });
  })
  .then(wines => {
    // return Promise.map(wines, wineArray => {
    //   let random = Math.floor(Math.random() * (wineArray.length));
    //   return axios.get('http://services.wine.com/api/beta2/service.svc/JSON/catalog?filter=price(0|100)&state=CA&apikey=' + api.wine_key, {"search": wineArray[random]}).then(result => {
    //     return wine.refactor(result.data.Products.List);
    //   });
    // });
    return exampleData.exampleData;
  })
  .then(wines => {
    wines.map(wine => {
      finalResults.finalWines.push([wine]);
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