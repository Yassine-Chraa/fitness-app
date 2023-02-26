import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return false;
  }
};

export default getData;
