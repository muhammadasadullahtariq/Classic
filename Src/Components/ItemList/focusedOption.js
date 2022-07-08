import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from '../Global/normalText';
import Icon from 'react-native-vector-icons/Ionicons';
//import arr from '../../assets/Strings/detailScreenOptions';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => console.log('i pressed')}>
      <View style={styles.mainContainer}>
        <View style={styles.childViewContainer}>
          <Icon name={props.iconName} color={'white'} size={30} />
        </View>
        <View style={styles.childViewContainer}>
          <Text
            text={props.name}
            componentStyle={{
              color: 'white',
              marginTop: 0,
              paddingTop: 0,
              paddingLeft: 5,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F7941F',
    height: 100,
    width: 100,
    borderRadius: 13,
    justifyContent: 'center',
  },
  childViewContainer: {
    alignItems: 'center',
  },
});

export default screen;
