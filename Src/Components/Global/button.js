import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './headerText';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.mainContainer, props.viewStyle]}
      onPress={props.Onpress}>
      <View style={[styles.componentContainer, props.componentStyle]}>
        <Text
          text={props.text}
          componentStyle={{color: 'white', alignSelf: 'center'}}
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
    backgroundColor: '#1692ff',
    borderRadius: 30,
    alignSelf: 'center',
  },
});

export default screen;
