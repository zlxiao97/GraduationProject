import AsyncStorage from '@react-native-community/async-storage';

export function setToken(token) {
  return AsyncStorage.setItem('st-token', token);
}

export function getToken() {
  return AsyncStorage.getItem('st-token');
}
