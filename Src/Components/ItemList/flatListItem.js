import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeadingText from '../Global/headerText';
import image from '../../Asserts/Images/logo.png';
import NormalText from '../Global/normalText';
import {useNavigation} from '@react-navigation/native';
import primary from '../Global/Colors';

const screen = props => {
  const [cartFlag, setCartFlag] = useState(false);
  const [favourtFlag, setFavourtFlag] = useState(false);
  const navgation = useNavigation();

  useEffect(() => {
    console.log(props.item);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{width: '100%', height: '65%'}}
        onPress={() => {
          navgation.navigate('DetailScreen', {item: props.item});
        }}>
        <Image source={props.item.image} style={styles.imageContainer} />
      </TouchableOpacity>
      {/* <View style={styles.childViewContainer}> */}
      <HeadingText
        text={props.item.name}
        style={styles.headingContainer}
        viewStyle={{alignSelf: 'center'}}
      />
      {/* <NormalText text={props.item.name} style={styles.normalTextContainer} />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => setFavourtFlag(!favourtFlag)}
          activeOpacity={0.7}>
          {favourtFlag && (
            <View style={styles.iconContainer}>
              <Icon name="heart" size={25} />
            </View>
          )}
          {!favourtFlag && (
            <View style={styles.iconContainer}>
              <Icon name="heart-outline" size={25} />
            </View>
          )}
        </TouchableOpacity> */}
      {/* </View> */}
      {/* <View style={styles.childViewContainer}> */}
      {/* <HeadingText text={props.item.price} style={styles.headingContainer} /> */}
      <NormalText
        text={props.item.about}
        style={styles.normalTextContainer}
        viewStyle={{alignSelf: 'center'}}
      />
      {/* <View style={{flex: 1}} /> */}
      {/* <TouchableOpacity
          onPress={() => setCartFlag(!cartFlag)}
          activeOpacity={0.7}>
          {cartFlag && (
            <View style={styles.iconContainer}>
              <Icon name="ios-cart" size={25} />
            </View>
          )}
          {!cartFlag && (
            <View style={styles.iconContainer}>
              <Icon name="ios-cart-outline" size={25} />
            </View>
          )}
        </TouchableOpacity> */}
      {/* </View> */}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <NormalText
          text={'$'}
          style={{opacity: 0.6, color: primary, fontSize: 15}}
          viewStyle={{alignSelf: 'center', marginTop: 5, paddingRight: 0}}
        />
        <HeadingText
          text={props.item.price}
          style={{marginTop: 5, paddingLeft: 0}}
          viewStyle={{alignSelf: 'center'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 220,
    width: 180,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'white',
    alignSelf: 'center',
    shadowOffset: {
      width: 89,
      height: 89,
    },
    shadowOpacity: 0.25,
    shadowColor: 'black',
    elevation: 9,
    marginBottom: 15,
    marginHorizontal: 0,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    aspectRatio: 1.4,
    alignSelf: 'center',
  },
  headingContainer: {
    fontSize: 15,
    padding: 0,
    paddingLeft: 5,
  },
  normalTextContainer: {
    fontSize: 15,
    padding: 0,
    paddingLeft: 5,
    opacity: 0.6,
  },
  childViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {alignSelf: 'center', marginTop: 5, marginRight: 10},
});

export default screen;
