import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Text from '../Components/Global/normalText';
import HeadingText from '../Components/Global/headerText';
import Icon from 'react-native-vector-icons/Feather';
import * as colors from '../Constants/Colors';
import Button from '../Components/Global/button';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct} from '../Actions/actions';
const white = 'white';

const Screen = ({route, navigation}) => {
  const {item} = route.params;
  const [count, setCount] = useState(0);
  const product = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(item);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Image source={item.image} style={styles.carouselContainer} />
        <View style={styles.headerViewContainer}>
          <HeadingText
            text={item.name}
            style={{
              marginTop: 10,
              marginBottom: 0,
              paddingTop: 0,
              paddingLeft: 10,
              fontSize: 30,
            }}
            viewStyle={{alignSelf: 'center'}}
          />
          <Text
            text={item.about}
            viewStyle={{alignSelf: 'center'}}
            style={{opacity: 0.6}}
          />
        </View>
        <View style={styles.countViewContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Text
              text={'$'}
              style={{opacity: 0.6, color: colors.primary, fontSize: 15}}
              viewStyle={{alignSelf: 'center', marginTop: 5, paddingRight: 0}}
            />
            <Text
              text={count == 0 ? item.price : item.price * count}
              viewStyle={{marginTop: 5}}
              style={{
                paddingLeft: 0,
                opacity: count == 0 ? 0.5 : 1,
                fontSize: 30,

                height: 50,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={count == 0 ? true : false}
              onPress={() => setCount(count - 1)}>
              <View
                style={[
                  styles.plusMinusButtonContainer,
                  {backgroundColor: count == 0 ? '#dbdbdb' : '#afafaf'},
                ]}>
                <Icon name="minus" color={white} size={30} />
              </View>
            </TouchableOpacity>
            <Text
              text={count}
              style={{
                fontSize: 35,
                paddingHorizontal: 10,
                color: colors.primary,
                opacity: count == 0 ? 0.1 : 1,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setCount(count + 1)}>
              <View style={styles.plusMinusButtonContainer}>
                <Icon name="plus" color={white} size={30} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', backgroundColor: 'white'}}>
          <Text style={styles.textContainer} text={item.detail} />
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
          }}></View>
        <Button
          text={'Add to cart'}
          style={{marginBottom: '7%'}}
          onPress={() => {
            console.log('Add to cart');
            //console.log(product);
            dispatch(addProduct({...item, quantity: count}));
            //console.log(product);
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
  },
  carouselShadowContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'blue',

    alignSelf: 'center',
  },
  carouselContainer: {
    width: '100%',
    alignSelf: 'center',
    height: 300,
    backgroundColor: colors.primary,
  },
  textContainer: {
    fontSize: 18,
    width: '100%',
    paddingTop: 10,
    opacity: 0.5,
    paddingHorizontal: 10,
  },
  bottomViewContainer: {
    height: 66,
    width: '100%',
    backgroundColor: colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomTextContainer: {
    color: 'white',
    marginTop: 25,
    alignSelf: 'center',
    padding: 0,
    marginLeft: -40,
  },
  headerViewContainer: {
    width: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {alignSelf: 'center', marginTop: 10, marginRight: 10},
  countViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  plusMinusButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});

export default Screen;
