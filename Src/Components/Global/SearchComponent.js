import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import InputComponent from './inputComponent';
import Icon from 'react-native-vector-icons/Feather';
import primary from '../../Constants/Colors';

const white = 'white';

const screen = props => {
  return (
    <View style={[styles.mainContainer, props.mainContainer]}>
      <InputComponent
        style={[{width: '70%', backgroundColor: white}, props.style]}
        placeHolder={props.placeHolder}
        text={props.text}
        textHandler={props.textHandler}
        onSubmit={props.onSubmit}
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          textAlign: 'left',
        }}
      />
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
        <View style={styles.seacrIconViewContainer}>
          <Icon name="search" color={primary} size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10,
  },
  seacrIconViewContainer: {
    height: 50,
    width: 50,
    backgroundColor: white,
    borderTopRightRadius: 11,
    borderBottomRightRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default screen;
