// import * as tf from '@tensorflow/tfjs'
// import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native'
// import * as FileSystem from 'expo-file-system';




// //======================> load model <========================//
// const loadModel = async () => {
//     //.ts: const loadModel = async ():Promise<void|tf.LayersModel>=>{
//     const modelJSON = require('../assets/models/mobilenet_v1.json')
//     const modelWeights = require('../assets/models/mobilenet_v1.bin')
//     const model = await tf.loadLayersModel(
//         bundleResourceIO(modelJSON, modelWeights)
//     ).catch((e) => {
//         console.log("[LOADING ERROR] info:", e)
//     })
//     return model
// }


// //======================> transfer img to tensor <========================//
// const transformImageToTensor = async (uri) => {
//     //.ts: const transformImageToTensor = async (uri:string):Promise<tf.Tensor>=>{
//     //read the image as base64
//     const img64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
//     const imgBuffer = tf.util.encodeString(img64, 'base64').buffer
//     const raw = new Uint8Array(imgBuffer)
//     let imgTensor = decodeJpeg(raw)
//     const scalar = tf.scalar(255)
//     //resize the image
//     imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [300, 300])
//     //normalize; if a normalization layer is in the model, this step can be skipped
//     const tensorScaled = imgTensor.div(scalar)
//     //final shape of the rensor
//     const img = tf.reshape(tensorScaled, [1, 300, 300, 3])
//     return img
// }


// //======================> make prediction <========================//
// const makePredictions = async (batch, model, imagesTensor) => {
//     //.ts: const makePredictions = async (batch:number, model:tf.LayersModel,imagesTensor:tf.Tensor<tf.Rank>):Promise<tf.Tensor<tf.Rank>[]>=>{
//     //cast output prediction to tensor
//     const predictionsdata = model.predict(imagesTensor)
//     //.ts: const predictionsdata:tf.Tensor = model.predict(imagesTensor) as tf.Tensor
//     let pred = predictionsdata.split(batch) //split by batch size
//     //return predictions 
//     return pred
// }

// export const ClassifyImage = async (image) => {
//     await tf.ready()
//     const model = await loadModel() //as tf.LayersModel
//     const tensor_image = await transformImageToTensor(image)
//     const predictions = await makePredictions(1, model, tensor_image)
//     return predictions
// }