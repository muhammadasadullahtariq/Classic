import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './headerText';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      activeOpacity={props.active ? 0.7 : 1}
      style={[styles.mainContainer, props.viewStyle]}
      onPress={props.Onpress}>
      <View
        style={[
          styles.componentContainer,
          props.componentStyle,
          {opacity: props.active ? 1 : 0.5},
        ]}>
        <Text
          text={props.text}
          componentStyle={{color: 'white', alignSelf: 'center', fontSize: 22}}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {width: '100%'},
  componentContainer: {
    width: '50%',
    height: 50,
    backgroundColor: '#1692ff',
    borderRadius: 30,
    alignSelf: 'center',
  },
});

export default screen;
