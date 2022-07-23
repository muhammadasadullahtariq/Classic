import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from '../Global/normalText';
import Icon from 'react-native-vector-icons/Ionicons';
import primary from '../../Constants/Colors';
//import arr from '../../assets/Strings/detailScreenOptions';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      >
      <View style={styles.mainContainer}>
        <View style={styles.childViewContainer}>
          <Icon name={props.iconName} color={primary} size={30} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    height: 60,
    width: 60,
    borderRadius: 13,
    justifyContent: 'center',
  },
  childViewContainer: {
    alignItems: 'center',
  },
});

export default screen;
