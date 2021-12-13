import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={[props.viewStyle, styles.mainContainer]}>
      <Text style={[styles.componentContainer, props.componentStyle]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  componentContainer: {
    //fontFamily: 'Riche',
    fontSize: 30,
    color: 'black',
    padding: 5,
    marginVertical: 5,
    fontWeight: 'bold',
  },
});

export default screen;
