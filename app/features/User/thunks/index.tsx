import {createAsyncThunk} from '@reduxjs/toolkit';
import httpClient from '../../../utils/https/httpClient';
import {objToQueryString} from '../../../utils/Methods';

interface loginParams {
  username: string;
  password: string;
}

export const userLoginAsync = createAsyncThunk(
  'User/Login',
  async (params: loginParams) => {
    const response = await httpClient.callAPI(
      'POST',
      '/auth/login',
      params,
      '',
    );
    return response;
  },
);
