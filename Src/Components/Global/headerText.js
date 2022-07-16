import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={[props.viewStyle, styles.mainContainer]}>
      <Text style={[styles.componentContainer, props.style]}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  componentContainer: {
    //fontFamily: 'Riche',
    fontSize: 20,
    color: 'black',
    padding: 5,
    paddingVertical: Platform.OS === 'android' ? -5 : 5,
    // marginVertical: 5,
    //fontWeight: 'bold',
  },
});

export default screen;
