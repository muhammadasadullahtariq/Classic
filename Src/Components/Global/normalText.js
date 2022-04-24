import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={[props.viewStyle, styles.mainContainer]}>
      <Text style={[styles.componentContainer, props.style]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {justifyContent: 'center'},
  componentContainer: {
    
    fontSize: 18,
    color: 'black',
    padding: 5,
    
  },
});

export default screen;
