import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from '../../../utils/https/httpClient';
import {objToQueryString} from '../../../utils/Methods';

interface productsParams {}

export const getProductsAsync = createAsyncThunk(
  'product/getProduct',
  async (params: productsParams) => {
    const response = await httpClient.callAPI('GET', '/products', params, '');
    return response;
  },
);

interface productsParams {
  productId: string;
}

export const getProductByIdAsync = createAsyncThunk(
  'product/getProductInfo',
  async (params: productsParams) => {
    const getBody = objToQueryString(params);

    const URL = '/products/' + params?.productId;
    console.log('Get Request Body ', URL);

    const response = await httpClient.callAPI('GET', URL, {}, '');
    return response;
  },
);

interface searchProdcutParams {
  searchKey: string;
}

export const searchProductAsync = createAsyncThunk(
  'product/searchProduct',
  async (params: searchProdcutParams) => {
    const searchURL = '/products/search?q=' + params.searchKey + '&limit=20';
    console.log('searchURL ==> ', searchURL);

    const response = await httpClient.callAPI('GET', searchURL, {}, '');
    return response;
  },
);

// Add Product

interface addProdcutParams {
  title: string;
  description: string;
  brand: string;
  stock: string;
}

export const addProductAsync = createAsyncThunk(
  'product/addProduct',
  async (params: addProdcutParams) => {
    const response = await httpClient.callAPI(
      'POST',
      '/products/add',
      params,
      '',
    );
    return response;
  },
);
