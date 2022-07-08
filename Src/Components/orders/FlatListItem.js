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
import primary from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import handelFavourite from '../../Functions/global/handelFavourite';
import checkProductExistInFavourite from '../../Functions/global/checkProductExistInFavourite';
import {useDispatch} from 'react-redux';

const PrimaryColor = primary;
const windowWidth = Dimensions.get('window').width;

const Screen = props => {
  const navgation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(props.item.products, 'asad ullah');
    //console.log(props.index, 'asad ullah');
  }, []);
  const [count, setCount] = useState(0);
  // const [favouriteFalg, setFavouriteFalg] = useState(
  //   checkProductExistInFavourite(props.item._id),
  // );

  // const handelFavouriteButton = async () => {
  //   await handelFavourite(
  //     favouriteFalg,
  //     setFavouriteFalg,
  //     props.item._id,
  //     dispatch,
  //   );
  // };

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
            }}></View>
          <HeaderText
            text={props.item.createdAt.substring(0, 10)}
            style={{color: primary}}
          />
          <View style={{flexDirection: 'row'}}>
            <HeaderText text={'Total Bill:'} style={{fontSize: 18}} />
            <Text text={'$ ' + props.item.totalPrice} style={{fontSize: 18}} />
            <View style={{flex: 1}} />
          </View>
          {props.item.products.map((product, index) => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text text={product.name} />
                <Text text={product.quantity} />
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    minHeight: 120,
    width: windowWidth - 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    borderRadius: 17,
    marginHorizontal: 3,
    marginBottom: 3,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 10,
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

export default Screen;
