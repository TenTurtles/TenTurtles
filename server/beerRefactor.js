const refactor = beers => {
  let random = Math.floor(Math.random() * (beers.length - 2)) + 1;
  return {
    name: beers[random].name,
    description: beers[random].description ? beers[random].description : 'Not available',
    style: beers[random].style.shortName,
    image: beers[random].labels ? beers[random].labels.icon : "http://www.jazardezign.com/wp-content/uploads/best-15-beer-vector-illustration-stock-mug-photos-125x125.jpg",
  };
};

module.exports.refactor = refactor;