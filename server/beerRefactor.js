const refactor = beers => {
  let random = Math.floor(Math.random() * (beers.length - 2)) + 1;
  return {
    name: beers[random].name,
    description: beers[random].description ? beers[random].description : 'Not available',
    style: beers[random].style.shortName,
    image: beers[random].labels ? beers[random].labels.icon : 'Not available',
  };
};

module.exports.refactor = refactor;