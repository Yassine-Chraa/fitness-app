import React from 'react';
import {Image} from '@rneui/themed';
import {View, Text, StyleSheet, Button} from 'react-native';
import Swiper from 'react-native-swiper';

export const Slide = ({data}: any): JSX.Element => {
  return (
    <View testID={data.testID} style={slideStyle.slide}>
      <Image
        style={slideStyle.image}
        source={{uri: 'https://placehold.jp/180x260.png'}}
      />
      <View style={slideStyle.textContainer}>
        <Text style={slideStyle.text}>{data.text}</Text>
        <View style={slideStyle.button}>
          <Button title="Join Us" />
        </View>
      </View>
    </View>
  );
};

const slideStyle = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    width: 240,
    marginBottom: 25,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: '#0006',
    paddingTop: 55,
    paddingLeft: 35,
  },
  button: {
    maxWidth: 120,
  },
});

const Header = (): JSX.Element => {
  const slideData = [
    {
      testID: 'slide-1',
      text: 'Text text text Text text text Text text',
    },
    {
      testID: 'slide-2',
      text: 'Text text text Text text text Text text',
    },
    {
      testID: 'slide-3',
      text: 'Text text text Text text text Text text',
    },
    {
      testID: 'slide-4',
      text: 'Text text text Text text text Text text',
    },
  ];

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons
        loop={true}
        autoplay
        autoplayTimeout={5}>
        <Slide data={slideData[0]} />
        <Slide data={slideData[1]} />
        <Slide data={slideData[2]} />
        <Slide data={slideData[3]} />
      </Swiper>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  wrapper: {},
});