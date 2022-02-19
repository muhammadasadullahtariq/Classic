import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../Global/normalText';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <Text
        text={props.property + ':  ' + props.value}
        viewStyle={{opacity: 0.5, marginLeft: 5}}
        componentStyle={{marginTop: 0, paddingTop: 0}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
});

export default screen;
