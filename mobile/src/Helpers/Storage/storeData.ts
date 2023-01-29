import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key:string,data: any) => {
    try {
        const jsonData = JSON.stringify(data)
        await AsyncStorage.setItem(key, jsonData)
        return true
    } catch (e) {
        return false
    }
}

export default storeData;