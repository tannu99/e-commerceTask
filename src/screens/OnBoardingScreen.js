import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import { colors } from '../utils/constants';

export const OnBoardingScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 2500);
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <Image source={require('../assets/splash1.jpg')} style={styles.image} />
      <Text style={styles.text}>Shop the latest trends, deals, and more!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '85%',
    resizeMode: 'contain',
  },
  text: {
    color: colors.purple,
    fontSize: 25,
    textAlign: 'center',
    width: '70%',
    marginTop: '-30%',
    letterSpacing: 2,
    lineHeight: 35,
  },
});
