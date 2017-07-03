const preferences = (prefs) => {
  let passPref = [];
    for (let key in prefs) {
      if (key !== 'open' && key !== 'preferences') {
        if (prefs[key] === true) {
          passPref.push(key);
        }
      }
    }
  return passPref;
};

const beers = beers => {
  let random = Math.floor(Math.random() * (beers.length - 2)) + 1;
  return {
    name: beers[random].name,
    description: beers[random].description ? beers[random].description : 'Not available',
    style: beers[random].style.shortName,
    image: beers[random].labels ? beers[random].labels.icon : "http://www.jazardezign.com/wp-content/uploads/best-15-beer-vector-illustration-stock-mug-photos-125x125.jpg",
  };
};

const recipes = recipes => {
  return recipes.map(item => {
    return {
      uri: item.recipe.uri,
      label: item.recipe.label,
      image: item.recipe.image,
      source: item.recipe.source,
      url: item.recipe.url,
      healthLabels: item.recipe.healthLabels,
      ingredients: item.recipe.ingredients.map(ingredient => {
        return {
          text: ingredient.text,
          food: ingredient.food
        };
      })
    };
  });
};

const wines = wines => {
  let random = Math.floor(Math.random() * (wines.length - 2)) + 1;
  return {
    name: wines[random].Name,
    url: wines[random].Url,
    labelUrl: wines[random].Labels[0].Url,
    type: wines[random].Varietal ? wines[random].Varietal.Name : 'Not available',
    region: wines[random].Appellation ? wines[random].Appellation.Name : 'Not available',
    rating: wines[random].Ratings ? wines[random].Ratings.HighestScore : 'Not available',
    price: wines[random].Retail ? wines[random].Retail.Price : 'Not available'
  };
};

module.exports = {
  preferences: preferences,
  beers: beers,
  recipes: recipes,
  wines: wines
};
