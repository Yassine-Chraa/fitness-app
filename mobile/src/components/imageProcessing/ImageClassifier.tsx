// import React, { useRef,useState,useEffect } from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import { SafeAreaView } from 'react-native';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native'
// const mobilenet = require('@tensorflow-models/mobilenet');

// const ImageClassifier = (): JSX.Element => {
//     const cameraRef = useRef<RNCamera>(null);
//     const [model, setModel] = useState<any>();
//     const [result, setResult] = useState('Nothing');

//     const takePicture = async () => {
//         if (cameraRef.current) {
//             const options = { quality: 0.5, base64: true };
//             const data = await cameraRef.current.takePictureAsync(options);
//             console.log(data.uri);
//             console.log(mobilenet)
//             classifyImage(data);
//         }
//     };


//     const loadModel = async () => {
//         await tf.ready();
//         const m = await mobilenet.load();
//         setModel(() => m)
//     }


//     const classifyImage = async (img:any) => {
//         const predictions = await model.classify(img);
//         setResult(() => predictions)
//     }

//     useEffect(() => {
//         loadModel();
//         console.log(model)
//     },[])


//     return (
//         <View style={{ flex: 1 }}>
//             <SafeAreaView>
//                 <RNCamera
//                     ref={cameraRef}
//                     style={{ flex: 1 }}
//                     type={RNCamera.Constants.Type.back}
//                     captureAudio={false}
//                 />
//             </SafeAreaView>
//             <TouchableOpacity onPress={takePicture} style={{ alignSelf: 'center', marginBottom: 16 }}>
//                 <Text style={{ fontSize: 20, color: 'red' }}>{result}</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default ImageClassifier;



// import React, { useEffect } from 'react';
// import 'react-native-reanimated';
// import { Dimensions, Platform, StyleSheet, useWindowDimensions } from 'react-native';
// import { Camera, useFrameProcessor, useCameraDevices } from 'react-native-vision-camera';
// import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
// import Animated from 'react-native-reanimated';
// import Svg, { Line } from 'react-native-svg';

// const AnimatedLine = Animated.createAnimatedComponent(Line);

// const usePosition = (pose: any, valueName1: any, valueName2: any) => {
//     return useAnimatedStyle(
//         ():any => ({
//             x1: pose.value[valueName1].x,
//             y1: pose.value[valueName1].y,
//             x2: pose.value[valueName2].x,
//             y2: pose.value[valueName2].y,
//         }),
//         [pose],
//     );
// };

// export function objectDetect(frame: any) {
//     'worklet';
//     return __poseDetection(frame);
// }

// const defaultPose = {
//     leftShoulder: { x: 0, y: 0 },
//     rightShoulder: { x: 0, y: 0 },
//     leftElbow: { x: 0, y: 0 },
//     rightElbow: { x: 0, y: 0 },
//     leftWrist: { x: 0, y: 0 },
//     rightWrist: { x: 0, y: 0 },
//     leftHip: { x: 0, y: 0 },
//     rightHip: { x: 0, y: 0 },
//     leftKnee: { x: 0, y: 0 },
//     rightKnee: { x: 0, y: 0 },
//     leftAnkle: { x: 0, y: 0 },
//     rightAnkle: { x: 0, y: 0 },
// };

// function ImageClassifier() {
//     const pose = useSharedValue(defaultPose);

//     const leftWristToElbowPosition:any = usePosition(pose, 'leftWrist', 'leftElbow');
//     const leftElbowToShoulderPosition:any = usePosition(pose, 'leftElbow', 'leftShoulder');
//     const leftShoulderToHipPosition:any = usePosition(pose, 'leftShoulder', 'leftHip');
//     const leftHipToKneePosition:any = usePosition(pose, 'leftHip', 'leftKnee');
//     const leftKneeToAnklePosition:any = usePosition(pose, 'leftKnee', 'leftAnkle');

//     const rightWristToElbowPosition:any = usePosition(pose, 'rightWrist', 'rightElbow');
//     const rightElbowToShoulderPosition:any = usePosition(pose, 'rightElbow', 'rightShoulder');
//     const rightShoulderToHipPosition:any = usePosition(pose, 'rightShoulder', 'rightHip');
//     const rightHipToKneePosition:any = usePosition(pose, 'rightHip', 'rightKnee');
//     const rightKneeToAnklePosition:any = usePosition(pose, 'rightKnee', 'rightAnkle');

//     const shoulderToShoulderPosition:any = usePosition(pose, 'leftShoulder', 'rightShoulder');
//     const hipToHipPosition:any = usePosition(pose, 'leftHip', 'rightHip');

//     const dimensions = useWindowDimensions();

//     const frameProcessor = useFrameProcessor(frame => {
//         'worklet';
//         const poseObject = objectDetect(frame);

//         const xFactor = dimensions.width / frame.width;
//         const yFactor = dimensions.height / frame.height;

//         const poseCopy:any = {
//             leftShoulder: { x: 0, y: 0 },
//             rightShoulder: { x: 0, y: 0 },
//             leftElbow: { x: 0, y: 0 },
//             rightElbow: { x: 0, y: 0 },
//             leftWrist: { x: 0, y: 0 },
//             rightWrist: { x: 0, y: 0 },
//             leftHip: { x: 0, y: 0 },
//             rightHip: { x: 0, y: 0 },
//             leftKnee: { x: 0, y: 0 },
//             rightKnee: { x: 0, y: 0 },
//             leftAnkle: { x: 0, y: 0 },
//             rightAnkle: { x: 0, y: 0 },
//         };

//         Object.keys(poseObject).forEach(v => {
//             poseCopy[v] = {
//                 x: poseObject[v].x * xFactor,
//                 y: poseObject[v].y * yFactor,
//             };
//         });

//         pose.value = poseCopy;
//     }, []);

//     const devices = useCameraDevices();
//     const device = devices.back;

//     useEffect(() => {
//         const checkPermissions = async () => {
//             await Camera.requestCameraPermission();
//         };
//         checkPermissions();
//     }, []);

//     if (device == null) {
//         return null;
//     }

//     return (
//         <>
//             <Camera
//                 frameProcessor={frameProcessor}
//                 style={StyleSheet.absoluteFill}
//                 device={device}
//                 isActive={true}
//                 orientation="portrait"
//                 frameProcessorFps={15}
//             />
//             <Svg
//                 height={Dimensions.get('window').height}
//                 width={Dimensions.get('window').width}
//                 style={styles.linesContainer}>
//                 <AnimatedLine animatedProps={leftWristToElbowPosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={leftElbowToShoulderPosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={leftShoulderToHipPosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={leftHipToKneePosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={leftKneeToAnklePosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={rightWristToElbowPosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={rightElbowToShoulderPosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={rightShoulderToHipPosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={rightHipToKneePosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={rightKneeToAnklePosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={shoulderToShoulderPosition} stroke="red" strokeWidth="2" />
//                 <AnimatedLine animatedProps={hipToHipPosition} stroke="red" strokeWidth="2" />
//             </Svg>
//         </>
//     );
// }

// export default ImageClassifier;

// const styles = StyleSheet.create({
//     linesContainer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         height: Dimensions.get('window').height,
//         width: Dimensions.get('window').width,
//     },
// });

import React from 'react'
import {View, Text} from 'react-native' 

const ImageClassifier = ():JSX.Element => {
    return (
        <View>
            <Text>imageClassifier</Text>
        </View>
    )
}

export default ImageClassifier