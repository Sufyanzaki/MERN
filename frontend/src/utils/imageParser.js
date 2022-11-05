function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
    return images;
  }
  
export const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg|jpg)$/));

function importFlags(r) {
  let images = {};
  r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
  return images;
}

export const flags = importFlags(require.context('../images/flags', false, /\.(png|jpe?g|svg|jpg)$/));