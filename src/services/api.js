import axios from "axios";
import { auth } from './pages/firebase';

const BASE_URL = "https://apple-store-9f99d-default-rtdb.firebaseio.com/";

function createAuthenticatedRequest(method, url, data) {
  if (auth.currentUser) {
    return auth.currentUser.getIdToken().then((token) => {
      console.log('Token:', token);
      return axios({
        method,
        url,
        data,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    });
  } else {
    throw new Error('User is not authenticated');
    // or redirect to login page
    // window.location.href = '/login';
  }
}


export function getProducts() {
  return createAuthenticatedRequest('get', `${BASE_URL}/products.json`);
}

export function addProduct(product) {
  return createAuthenticatedRequest('post', `${BASE_URL}/products.json`, product);
}

export function getProductById(productId) {
  return createAuthenticatedRequest('get', `${BASE_URL}/products/${productId}.json`);
}

export function updateProduct(productId, updatedProduct) {
  return createAuthenticatedRequest('put', `${BASE_URL}/products/${productId}.json`, updatedProduct);
}

export function deleteProduct(productId) {
  return createAuthenticatedRequest('delete', `${BASE_URL}/products/${productId}.json`);
}
