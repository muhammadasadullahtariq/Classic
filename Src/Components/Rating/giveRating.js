import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Rating} from 'react-native-ratings';
import InputTextComponent from '../Global/inputComponent';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <Rating
        type="custom"
        
        style={{paddingVertical: 10, alignSelf: 'flex-start', paddingLeft: 10}}
        tintColor="#cfcfcf"
        starContainerStyle={{backgroundColor: 'red'}}
      />
      <InputTextComponent
        placeHolder="Detail"
        numberOfLines={5}
        //text={}
        maxLegth={256}
        flag={true}
        multiLine={true}
        viewStyle={{width: '95%', justifyContent: 'center', marginTop: 40}}
        style={{
          marginTop: 10,
          height: 150,
          textAlign: 'left',
          paddingTop: 10,
          paddingLeft: 10,
        }}
        textHandler={s =>{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
});

export default screen;
