import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import resturant from '../../Asserts/Images/Restaurant.png';
import CardView from 'react-native-cardview';
import HearderText from '../Global/headerText';
import NormalText from '../Global/normalText';
import * as PrimaryColor from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';

const Screen = props => {
  const Navigator = useNavigation();

  useEffect(() => {
    console.log(props.item, 'asad ullah');
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => Navigator.navigate('ResturantList')}>
      <View style={styles.mainContainer}>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}
          style={styles.cardcontainer}>
          <View style={{flexDirection: 'row', height: 150}}>
            <View style={{width: '40%'}}>
              <HearderText
                text={props.item.name}
                style={{color: 'white'}}></HearderText>
              <NormalText style={{color: 'white'}} text={props.item.detail} />
            </View>
            <View style={{flex: 1}} />
            <Image
              source={props.item.image}
              style={{
                width: 200,
                height: 130,
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
    backgroundColor: PrimaryColor.primary,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default Screen;
