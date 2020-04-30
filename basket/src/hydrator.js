const axios = require('axios');
const cache = require('./cache');

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
      const serviceResponse = await axios.get(`http://catalog/product/${productId}`);
      product = serviceResponse.data;
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
