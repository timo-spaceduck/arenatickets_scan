import AsyncStorage from '@react-native-async-storage/async-storage';

const getObjectFromStorage = async (key, defaultValue = []) => {
  let jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
};

const addObjectToStorage = async (key, object) => {
  return await AsyncStorage.setItem(key, JSON.stringify(object));
};

export {getObjectFromStorage, addObjectToStorage};
