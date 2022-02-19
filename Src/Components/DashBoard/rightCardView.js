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
    <TouchableOpacity activeOpacity={0.8} style={{width: '100%'}}>
      <View style={styles.mainContainer}>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={styles.cardcontainer}>
          <View
            style={{flexDirection: 'row', height: 150, alignItems: 'center'}}>
            <View style={{width: '60%'}}>
              <HearderText
                text={props.item.name}
                style={{
                  color: 'white',
                  marginBottom: 0,
                  marginTop: 0,
                  paddingTop: 0,
                  fontSize: 15,
                }}></HearderText>
              <NormalText
                style={{
                  color: 'white',
                  marginTop: 0,
                  paddingTop: 0,
                  fontSize: 12,
                }}
                text={props.item.detail}
              />
            </View>
            <View style={{flex: 1}} />
            <Image
              source={props.item.image}
              style={{
                width: '40%',
                height: 50,
                alignSelf: 'center',
                marginRight: 4,
              }}
            />
          </View>
        </CardView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  cardcontainer: {
    backgroundColor: PrimaryColor,
    width: '95%',
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
});

export default screen;
