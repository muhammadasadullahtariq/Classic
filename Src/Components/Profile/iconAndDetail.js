import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../Global/normalText';
import Icon from 'react-native-vector-icons/Ionicons';
import primary from '../../Constants/Colors';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <Icon name={props.iconName}  size={18} />
      <Text text={props.value} style={{opacity: 0.6, paddingTop: 0}} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginLeft: 30,
    alignItems: 'center',
    marginTop: 0,
  },
});

export default screen;
