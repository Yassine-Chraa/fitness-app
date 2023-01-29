import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async (key: string) => {
    try {
        const jsonData = await AsyncStorage.getItem(key)
        return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (e) {
        return false
    }
};

export default getData;
