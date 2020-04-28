const axios = require('axios');

const fetch = async (url, method, data) => {
  try {
    const res = await axios.request({ url, method: method || 'get', data });
    return res.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

const hydrateItem = async (productId, count) => {
  try {
    const product = await fetch(`http://catalog/product/${productId}`);
    return Promise.resolve({ product, count });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = async basket => Promise.all(
  Object.keys(basket).map(productId => hydrateItem(productId, basket[productId]))
);
