const axios = require('axios');
const cache = require('./cache');

const fetch = async (url, method, data) => {
  try {
    const res = await axios.request({ url, method: method || 'get', data });
    return res.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

const getProduct = async (productId) => new Promise((resolve, reject) => {
  cache.get(productId, async (error, reply) => {
    if (error) {
      reject(error);
      return;
    }
    let product;
    if (reply) {
      product = JSON.parse(reply);
      console.log(`Product ${productId} loaded from cache`);
    } else {
      product = await fetch(`http://catalog/product/${productId}`);
      console.log(`Product ${productId} loaded from service`);
      cache.set(productId, JSON.stringify(product));
    }
    resolve(product);
  });
});

const hydrateItem = async (productId, count) => {
  try {
    const product = await getProduct(productId);
    return Promise.resolve({ product, count });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = async basket => Promise.all(
  Object.keys(basket).map(productId => hydrateItem(productId, basket[productId]))
);
