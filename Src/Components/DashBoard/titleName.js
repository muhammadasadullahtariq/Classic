import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../Global/headerText';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <Text text={props.name} componentStyle={styles.textContainer} />
      <View style={{marginTop: -10}}>
        <View style={styles.circleView} />
        <View style={styles.lineView} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  circleView: {
    height: 20,
    width: 20,
    borderRadius: 30,
    backgroundColor: '#F7941F',
  },
  lineView: {
    width: '100%',
    height: 3,
    backgroundColor: '#F7941F',
    marginTop: -10,
  },
  textContainer: {
    color: 'white',
    marginBottom: 0,
    paddingBottom: 0,
    marginLeft: 20,
  },
});

export default screen;
