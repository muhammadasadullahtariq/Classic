import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import InputComponent from './inputComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import primary from './Colors';

const screen = props => {
  return (
    <View style={[styles.mainContainer, props.mainContainer]}>
      <View style={styles.seacrIconViewContainer}>
        <Icon name={props.iconName} color={primary} size={30} />
      </View>
      <InputComponent
        style={[{width: '70%'}, props.style]}
        placeHolder={props.placeHolder}
        text={props.text}
        textHandler={props.textHandler}
        onSubmit={props.onSubmit}
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          textAlign: 'left',
          borderLeftWidth: 0,
          borderLeftColor: 'white',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  seacrIconViewContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 3,
    borderRightWidth: 0,
    borderRightColor: 'white',
    borderColor: '#1692ff',
  },
});

export default screen;
