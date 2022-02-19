import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import resturant from '../../Asserts/Images/Restaurant.png';
import CardView from 'react-native-cardview';
import HearderText from '../Global/headerText';
import NormalText from '../Global/normalText';
import PrimaryColor from '../Global/Colors';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <TouchableOpacity activeOpacity={0.8} style={{width: '50%'}}>
      <CardView
        cardElevation={2}
        cardMaxElevation={2}
        cornerRadius={5}
        style={styles.cardcontainer}>
        <Image
          source={props.item.image}
          style={{
            width: '100%',
            height: 100,
            alignSelf: 'center',
            marginTop: 5,
          }}
        />
        <View style={{}}>
          <HearderText
            text={props.item.name}
            style={{color: 'white', marginBottom: 0}}></HearderText>
          <NormalText
            style={{color: 'white', marginTop: 0, paddingTop: 0}}
            text={props.item.detail}
          />
        </View>
      </CardView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  cardcontainer: {
    backgroundColor: PrimaryColor,
    width: '90%',
    height: 210,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
});

export default screen;
