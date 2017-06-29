const refactor = wines => {
  // console.log('wines::::: ', wines);
  let random = Math.floor(Math.random() * (wines.length - 2)) + 1;
  // console.log('wine ', wines);
  console.log('wine name ', wines[random].Name);
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

module.exports.refactor = refactor;