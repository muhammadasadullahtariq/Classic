import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeadingText from '../Global/headerText';
import image from '../../Asserts/Images/logo.png';
import NormalText from '../Global/normalText';

const screen = props => {
  const [cartFlag, setCartFlag] = useState(false);
  const [favourtFlag, setFavourtFlag] = useState(false);
  useEffect(() => {
    console.log(props.item);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{width: '100%', height: '75%'}}
        onPress={() => console.log('Move to other screen')}>
        <Image source={props.item.source} style={styles.imageContainer} />
      </TouchableOpacity>
      <View style={styles.childViewContainer}>
        <HeadingText text={'Name :'} componentStyle={styles.headingContainer} />
        <NormalText
          text={props.item.name}
          componentStyle={styles.normalTextContainer}
        />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => setFavourtFlag(!favourtFlag)}
          activeOpacity={0.7}>
          {favourtFlag && (
            <View style={styles.iconContainer}>
              <Icon name="heart" size={30} />
            </View>
          )}
          {!favourtFlag && (
            <View style={styles.iconContainer}>
              <Icon name="heart-outline" size={30} />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.childViewContainer}>
        <HeadingText
          text={'Price   :'}
          componentStyle={styles.headingContainer}
        />
        <NormalText
          text={props.item.price}
          componentStyle={styles.normalTextContainer}
        />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => setCartFlag(!cartFlag)}
          activeOpacity={0.7}>
          {cartFlag && (
            <View style={styles.iconContainer}>
              <Icon name="ios-cart" size={30} />
            </View>
          )}
          {!cartFlag && (
            <View style={styles.iconContainer}>
              <Icon name="ios-cart-outline" size={30} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 400,
    width: '98%',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    aspectRatio: 1.4,
    alignSelf: 'center',
  },
  headingContainer: {
    fontSize: 25,
    padding: 0,
    paddingLeft: 10,
  },
  normalTextContainer: {
    fontSize: 25,
    padding: 0,
    paddingLeft: 5,
    opacity: 0.6,
  },
  childViewContainer: {
    flexDirection: 'row',
  },
  iconContainer: {alignSelf: 'center', marginTop: 5, marginRight: 10},
});

export default screen;
