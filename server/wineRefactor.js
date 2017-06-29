const refactor = wines => {
  let random = Math.floor(Math.random() * (wines.length - 2)) + 1;
  return {
    name: wines[random].Name,
    url: wines[random].Url,
    labelUrl: wines[random].Labels[0].Url,
    type: wines[random].Varietal.Name,
    region: wines[random].Appellation.Name,
    rating: wines[random].Ratings.HighestScore,
    price: wines[random].Retail.Price
  };
};

module.exports.refactor = refactor;