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
import image from '../../assets/Images/logo.png';
import NormalText from '../Global/normalText';
import {useNavigation} from '@react-navigation/native';
import productImage from '../../assets/Images/burger.png';
import primary from '../../Constants/Colors';
import * as COLORS from '../../Constants/Colors';

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
        <Image
          source={
            props.item.image === '' ? productImage : {uri: props.item.image}
          }
          style={styles.imageContainer}
        />
      </TouchableOpacity>
      <HeadingText
        text={props.item.name}
        style={styles.headingContainer}
        viewStyle={{alignSelf: 'center'}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <NormalText
          text={'$'}
          style={{opacity: 0.6, color: primary, fontSize: 15}}
          viewStyle={{alignSelf: 'center', paddingRight: 0}}
        />
        <HeadingText
          text={props.item.price}
          style={{paddingLeft: 0, color: COLORS.primary}}
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
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowColor: COLORS.defaultBrownColor,
    elevation: 2,
    marginBottom: 15,
    marginHorizontal: 0,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    aspectRatio: 1.4,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
  },
  headingContainer: {
    fontSize: 18,
    padding: 0,
    paddingLeft: 5,
    marginTop: 10,
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
