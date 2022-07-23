import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import HeaderText from '../Global/headerText';
import Text from '../Global/normalText';
import * as colors from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import checkProductExistInFavourites from '../../Functions/global/checkProductExistInFavourite';
import handelFavourite from '../../Functions/global/handelFavourite';
import {useDispatch} from 'react-redux';
import productImage from '../../assets/Images/burger.png';

const PrimaryColor = colors.primary;
const white = 'white';

const windowWidth = Dimensions.get('window').width;

const Screen = props => {
  const navgation = useNavigation();
  const dispatch = useDispatch();
  const [favouriteFalg, setFavouriteFalg] = useState(
    checkProductExistInFavourites(props.item._id),
  );

  useEffect(() => {
  }, []);

  const handelFavouriteButton = async () => {
    await handelFavourite(
      favouriteFalg,
      setFavouriteFalg,
      props.item._id,
      dispatch,
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onPress(props.index)}>
      <View style={styles.mainContainer}>
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth - 85 - 60,
            }}>
            <Text
              text={props.item.rating}
              style={{fontSize: 15, opacity: 0.5, marginTop: 15}}
            />
            <View style={{flex: 1}} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                handelFavouriteButton();
              }}>
              {favouriteFalg && (
                <View style={{marginTop: 20}}>
                  <Icon name="heart" color={colors.primary} size={15} />
                </View>
              )}
              {!favouriteFalg && (
                <View style={{marginTop: 20}}>
                  <Icon name="hearto" color={colors.primary} size={15} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <HeaderText text={props.item.name} style={{color: 'black'}} />
          <Text text={props.item.about} />
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <HeaderText
              text={'$ ' + props.item.price}
              style={{fontSize: 18, color: colors.darkBrown}}
            />
            <View style={{flex: 1}} />
            <View
              style={{
                flexDirection: 'row',
                marginRight: -85,
                alignItems: 'center',
              }}>
              <Text
                text={'Quantity:'}
                style={{
                  fontSize: 18,
                  padding: 0,
                  color: colors.primary,
                }}
              />
              <Text
                text={props.item.quantity}
                style={{
                  fontSize: 25,
                  paddingRight: 10,
                }}
              />
            </View>
          </View>
        </View>
        <Image
          source={
            props.item.image == '' ? productImage : {uri: props.item.image}
          }
          style={styles.imageContainer}
        />
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
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    marginTop: 10,
    alignSelf: 'center',
  },
  imageContainer: {height: 85, width: 85, borderRadius: 50, marginTop: 20},
  plusMinusButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PrimaryColor,
  },
});

export default Screen;
