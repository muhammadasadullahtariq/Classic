import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import image from '../../Asserts/Images/Restaurant.png';
import HeaderText from '../Global/headerText';
import Text from '../Global/normalText';
import primary from '../Global/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const PrimaryColor = primary;
const white = 'white';

// const obj = {
//   source: image,
//   price: '3000',
//   name: 'Burger',
//   key: '0',
//   rating: 4.5,
//   price: 45,
//   detail: 'Delight pizza with souce and onion',
//   about: 'Short detail',
// };
const windowWidth = Dimensions.get('window').width;

const screen = props => {
  const navgation = useNavigation();
  useEffect(() => {}, []);
  const [count, setCount] = useState(0);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navgation.navigate('DetailScreen', {item: props.item});
      }}>
      <View style={styles.mainContainer}>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth - 85 - 60,
              //backgroundColor: 'black',
            }}>
            <Text
              text={props.item.rating}
              style={{fontSize: 15, opacity: 0.5, marginTop: 15}}
            />
            <View style={{marginTop: 20}}>
              <Icon name="star" color={'#FDCC0D'} size={15} />
            </View>
            <View style={{flex: 1}} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log('Liked button pressed')}>
              {props.item.flag && (
                <View style={{marginTop: 20}}>
                  <Icon name="heart" color={primary} size={15} />
                </View>
              )}
              {!props.item.flag && (
                <View style={{marginTop: 20}}>
                  <Icon name="hearto" color={primary} size={15} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <HeaderText text={props.item.name} style={{color: primary}} />
          <Text text={props.item.about} />
          <View style={{flexDirection: 'row'}}>
            <HeaderText text={'$ ' + props.item.price} style={{fontSize: 18}} />
            <View style={{flex: 1}} />
            <View
              style={{
                flexDirection: 'row',
                marginRight: -85,
                alignItems: 'center',
                marginTop: -10,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={count == 0 ? true : false}
                onPress={() => setCount(count - 1)}>
                <View
                  style={[
                    styles.plusMinusButtonContainer,
                    {backgroundColor: count == 0 ? '#dbdbdb' : '#afafaf'},
                  ]}>
                  <Icon name="minus" color={white} size={25} />
                </View>
              </TouchableOpacity>
              <Text
                text={count}
                style={{
                  fontSize: 25,
                  paddingHorizontal: 10,
                  color: {primary},
                  opacity: count == 0 ? 0.1 : 1,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setCount(count + 1)}>
                <View style={styles.plusMinusButtonContainer}>
                  <Icon name="plus" color={white} size={25} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Image source={props.item.image} style={styles.imageContainer} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: 150,
    width: windowWidth - 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    borderRadius: 17,
    marginHorizontal: 3,
    marginBottom: 3,
    //alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginTop: 10,alignSelf:'center'
  },
  imageContainer: {height: 85, width: 85, borderRadius: 50, marginTop: 20},
  plusMinusButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PrimaryColor,
    //marginLeft: 10,
  },
});

export default screen;
