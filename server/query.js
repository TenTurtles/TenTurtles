const express = require('express');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const api = require('./config.js');
const axios = require('axios');
const exampleData = require('./exampleData.js');
const helpers = require('./helpers.js');

const apiQuery = (data, res) => {
  // final results to be sent back to client //
  let finalResults = {
    finalRecipes: [],
    finalWines: [],
    finalBeers: []
  };
  // --------------------------------------- //

  // Ingredients to hold on for wines and beers search //
  let finalIngredients = [];
  // --------------------------------------- //
  // Iterate preference choices' for quering through recipe API //
  let url = 'https://api.edamam.com/search?q=' + data.item;
  if (data.choices) {
    let choices = data.choices;
    for (let i = 0; i < choices.length; i++) {
      // Add additional pref's choice to the URL //
      url += '&health=' + choices[i];
    }
  }
  // ------------------------ Start Recipes' matching API ----------------------------- //
  // Please get your own App Id and App key //
  axios.post(url, { "app_id": api.recipe_appId, "app_key": api.recipe_appkey })
  .then((result) => {
    // Refactor results //
    return helpers.recipes(result.data.hits);
  })
  .then(recipes => {
    return recipes.map(rec => {
      // Push recipes into final results //
      finalResults.finalRecipes.push(rec);
      return rec.ingredients.map(ingredient => {
        // Split all recipe ingredients into single word //
        return ingredient.food;
      }).join(' ').split(' ');
    });
  })
  // ------------------------ Start ingredients to wine pairing API ----------------------------- //
  .then(ingredients => {
    return Promise.map(ingredients, ingredient => {
      // Push all ingredients for wines and beers query later //
      finalIngredients.push(ingredient);
      return axios.post('http://138.68.58.133/pairing', { "ingredients": ingredient }).then(result => {
        return result.data;
      });
    });
  })
  // ------------------------ Start Wines' matching API ----------------------------- //
  .then(wines => {
    // Uncomment to use REAL data search //
    return Promise.map(wines, wineArray => {
      // Randomly select one wine from given choice for quering //
      let random = Math.floor(Math.random() * (wineArray.length));
      // Please get wine API key //
      return axios.get('http://services.wine.com/api/beta2/service.svc/JSON/catalog?filter=price(0|50)&state=CA&apikey=' + api.wine_key, {"search": wineArray[random]}).then(result => {
        // Refactor data from wine helpers function //
        return helpers.wines(result.data.Products.List);
      });
    });

    // // Uncomment for FAKE data search // //
    // return exampleData.wineData;
  })
  // --------------------------------------- //
  // Push wines to final result //
  .then(wines => {
    wines.map(wine => {
      finalResults.finalWines.push([wine]);
    });
  })
  // ------------------------ Start ingredients to beers pairing API ----------------------------- //
  .then(() => {
    return Promise.map(finalIngredients, array => {
      return axios.post('http://138.68.58.133/beerpairing', { "ingredients": array })
        .then(result => {
          console.log('result: ', result.data);
          return result.data;
        });
    });
  })
  // ------------------------ Start Beers' matching API ----------------------------- //
  // 
  .then(beerIds => {
    // Uncomment to use REAL data search //
    return Promise.map(beerIds, beerId => {
      // randomly select one beer from given choices for quering //
      let random = Math.floor(Math.random() * (beerId.length));
      // Please get Beer API key //
      return axios.get('http://api.brewerydb.com/v2/beers?styleId=' + beerId +'&key=' + api.beer_key).then(result => {
        // refactor with beers helper function //
        return helpers.beers(result.data.data);
      });
    });

    // // Uncomment for FAKE data search // //
    // return exampleData.beerData;
  })
  .then(beers => {
    // push beers to final result 
    beers.map(beer => {
      finalResults.finalBeers.push([beer]);
    });
  })
  .then( () => {
    // send result back to client //
    res.send(finalResults);
  })
  .catch(error => {
    console.log('error: ', error);
  });
};

module.exports.apiQuery = apiQuery;
