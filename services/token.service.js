import * as SecureStore from 'expo-secure-store';
const TOKEN_KEY = 'user_token';

const getToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

const setToken = async token => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

const deleteToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

export {getToken, setToken, deleteToken};
