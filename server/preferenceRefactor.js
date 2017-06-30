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
}

module.exports.preferences = preferences;