import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import * as Colors from '../../Constants/Colors';

export const component = props => {
  return (
    <View style={[style.mainView, props.viewStyle, style.shadow]}>
      <TextInput
        selectionColor={Colors.primary}
        autoCorrect={false}
        placeholder={props.placeHolder}
        value={props.text}
        returnKeyType="go"
        multiline={props.multiLine}
        numberOfLines={props.numberOfLines}
        keyboardType={props.Keyboard == null ? 'default' : props.Keyboard}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.textHandler}
        style={[style.textCointaner, props.style]}
        textAlignVertical={props.flag ? 'top' : 'center'}
        onSubmitEditing={props.onSubmit}></TextInput>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    width: '80%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    //flexDirection:""
  },
  textCointaner: {
    width: '100%',
    //borderLeftColor: 'white',
    borderColor: '#1692ff',
    padding: 5,
    ...Platform.select({
      ios: {
        paddingTop: 5,
      },
      android: {},
    }),
    color: '#092058',
    borderRadius: 11,
    backgroundColor: '#ffffff',
    height: '100%',
    fontSize: 15,
    textAlign: 'center',
    overflow: 'hidden',
    //fontFamily: 'Montserrat',
    fontWeight: '500',
    //justifyContent:""
  },
});

export default component;
