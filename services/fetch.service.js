import {API_URL, UNAUTHORIZED_TOKEN} from '@env';
import {getToken} from './token.service';
import i18n from "./localization";

const apiLogin = async (email, password) => {
  return await request('auth/login', 'POST', {
    email,
    password,
  });
};

const apiGetProfile = async () => {
  const token = await getToken();
  if (!token) {
    return null;
  }
  return await request('profile', 'GET');
};

const apiLoadEvents = async () => {
  return await request('scanner/timetables', 'GET');
};

const apiGetEventCodes = async timetableId => {
  return await request(`scanner/timetables/${timetableId}`, 'GET');
};

const apiGetOrderDetails = async orderId => {
  return await request(`scanner/order/${orderId}`, 'GET');
};

const apiGetValidatedSummary = async timetableId => {
  return await request(`scanner/timetables/${timetableId}/validated`, 'GET');
};

const apiSendScans = async (timetableId, data) => {
  return await request(`scanner/upload/${timetableId}`, 'POST', data);
};

const apiCheckBarcodeHistory = async (timetableId, barcode) => {
  return await request(
    `scanner/barcode/${timetableId}/${barcode}/history`,
    'GET',
  );
};

export {
  apiLogin,
  apiGetProfile,
  apiLoadEvents,
  apiGetEventCodes,
  apiGetOrderDetails,
  apiSendScans,
  apiCheckBarcodeHistory,
  apiGetValidatedSummary,
};

const request = async (endpoint, method = 'GET', body = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-language': i18n.getLanguage(),
    'X-API-KEY': UNAUTHORIZED_TOKEN,
  };
  const token = await getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const requestOptions = {
    method,
    headers,
  };
  if (method === 'POST') {
    requestOptions.body = JSON.stringify(body);
  }
  console.log(endpoint);
  try {
    let res = await fetch(`${API_URL}${endpoint}`, requestOptions);
    if (res.ok) {
      console.log(
        res.headers.map['x-ratelimit-remaining'],
        ' / ',
        res.headers.map['x-ratelimit-limit'],
      );
      return await res.json();
    }
    console.log(res.status);
    console.log(
      res.headers.map['x-ratelimit-remaining'],
      ' / ',
      res.headers.map['x-ratelimit-limit'],
    );
    try {
      return await res.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
