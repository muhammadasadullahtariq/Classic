import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './normalText';
import primary from './Colors';

const PrimaryColor = primary;

const screen = props => {
  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.mainContainer, props.viewStyle]}
      onPress={props.Onpress}>
      <View style={[styles.componentContainer, props.style]}>
        <Text
          text={props.text}
          style={{color: 'white', alignSelf: 'center'}}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {width: '100%'},
  componentContainer: {
    width: '60%',
    height: 50,
    backgroundColor:PrimaryColor,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default screen;
