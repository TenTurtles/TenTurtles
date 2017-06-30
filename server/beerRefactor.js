const refactor = beers => {
  let random = Math.floor(Math.random() * (beers.length - 2)) + 1;
  return {
    name: beers[random].name,
    description: beers[random].description ? beers[random].description : 'Not available',
    style: beers[random].style.shortName,
    image: beers[random].labels ? beers[random].labels.icon : "https://image.flaticon.com/icons/png/128/39/39467.png",
  };
};

module.exports.refactor = refactor;