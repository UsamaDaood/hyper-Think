import moment from 'moment';
import {Platform, Share} from 'react-native';
import {toastShow} from '../libs/toast';

export const dateToAgo = (date: any) => {
  return moment.utc(date).local().startOf('seconds').fromNow();
};

export const objToQueryString = (obj: any) => {
  // function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.join('&');
};

export const isObjectEmpty = (object: any) => {
  const objLength = Object.keys(object).length;
  return objLength == 0;
};
