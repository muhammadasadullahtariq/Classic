import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import image from '../../assets/Images/Restaurant.png';
import HeaderText from '../Global/headerText';
import Text from '../Global/normalText';
import primary from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';

const obj = {
  image: image,
  name: 'Macdonalds',
  rating: 4.5,
  price: 200,
  distance: 2.5,
  time: '30 min',
  type: 'fast food',
  location: 'koramangala',
};

const screen = props => {
  const navigation = useNavigation();
  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductListOfResturant')}>
      <View style={styles.mainContainer}>
        <View>
          <HeaderText text={props.item.name} style={{color: primary}} />
          <Text text={props.item.foodType} style={{paddingLeft: 10}} />
        </View>
        <Image source={props.item.image} style={styles.imageContainer} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    borderRadius: 17,
    marginHorizontal: 3,
    marginBottom: 3,
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  imageContainer: {height: 85, width: 85, borderRadius: 50},
});

export default screen;
