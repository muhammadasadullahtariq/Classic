import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import FlatListItem from '../Components/Products/flatListItem';
import {recentlyAdded} from '../Data/products';
import Text from '../Components/Global/normalText';
import HeaderText from '../Components/Global/headerText';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as colors from '../Constants/Colors';
import PlusMinusButton from '../Components/Global/plusMinusButton';
import ResturantList from '../Data/resturants';
import Button from '../Components/Global/button';
import getResturantProducts from '../Functions/Resturants/getResturantProducts';
import image from '../assets/Images/Restaurant.png';
import productImage from '../assets/Images/burger.png';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, removeProduct, emptyCart} from '../Actions/actions';
import showToast from '../Components/Global/toast';
import StatusBar from '../Components/Global/statusBar';
import TwoButtonAlert from '../Components/Global/Alerts/twoButtonAlert';

const Screen = ({navigation, route}) => {
  const id = route.params.id;
  const [data, setData] = useState({
    products: [
      {
        image: '',
        price: '3000',
        name: 'Burger',
        key: '0',
        rating: 4.5,
        price: 45,
        detail: 'Delight pizza with souce and onion',
        about: 'Short detail',
      },
    ],
  });

  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    productsHandler();
  }, []);
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const resturant = useSelector(state => state.resturant);

  const productsHandler = async () => {
    const result = await getResturantProducts(id);

    if (result.status === 'Success') {
      var data = result.data;
      if (data.image != '') {
        data.image = {uri: data.image};
      } else {
        data.image = image;
      }
      setData(data);
      //setResturant(result.data.resturant);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TwoButtonAlert
        okOnPress={() => {
          setShowAlert(false);
          dispatch(emptyCart());
          if (count > 0) {
            dispatch(
              addProduct({...data.products[selectedItem], quantity: count}),
            );
            showToast('Product added to cart');
          } else {
            dispatch(removeProduct(data.products[selectedItem]));
            showToast('Product removed from cart');
          }
        }}
        CancleOnPress={() => {
          setShowAlert(false);
        }}
        visible={showAlert}
        text="There is already a product from different resturant in the cart. Do you want empty cart and add this to the cart?"
      />
      <StatusBar barStyle="light-content" />
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              height: 300,
              width: '100%',
              backgroundColor: 'black',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ResturantDetail', {id: data._id})
              }>
              <Image
                source={data.image}
                style={{
                  width: '100%',
                  height: 300,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  backgroundColor: 'black',
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        ListHeaderComponentStyle={{marginHorizontal: 0, marginTop: -10}}
        data={data.products}
        renderItem={items => (
          <FlatListItem
            item={items.item}
            index={items.index}
            onPress={index => {
              setSelectedItem(index);
              refRBSheet.current.open();
              setCount(0);
            }}
          />
        )}
        keyExtractor={(item, index) => item._id}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        height={450}
        width={'90%'}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: colors.primary,
          },
          container: {
            width: '97%',
            alignSelf: 'center',
            borderRadius: 17,
          },
        }}>
        <Image
          style={{
            width: '100%',
            height: 200,
            aspectRatio: 1.9,
            marginTop: -25,
            backgroundColor: colors.primary,
            zIndex: -1,
          }}
          source={
            data.products[selectedItem].image === ''
              ? productImage
              : {uri: data.products[selectedItem].image}
          }
        />
        <HeaderText
          text={data.products[selectedItem].name}
          style={{
            marginTop: 10,
            marginBottom: 0,
            paddingTop: 0,
            paddingLeft: 10,
            fontSize: 30,
          }}
        />
        <Text
          text={data.products[selectedItem].detail}
          style={{opacity: 0.6}}
        />
        <PlusMinusButton
          count={count}
          setCount={setCount}
          price={data.products[selectedItem].price}
        />
        <View
          style={{
            flex: 1,
            width: '100%',
          }}></View>
        <Button
          text={'Add to cart'}
          style={{marginBottom: '7%'}}
          onPress={() => {
            if (
              data.products[selectedItem].resturant === resturant ||
              resturant === ''
            ) {
              if (count > 0) {
                dispatch(
                  addProduct({...data.products[selectedItem], quantity: count}),
                );
                showToast('Product added to cart');
              } else {
                dispatch(removeProduct(data.products[selectedItem]));
                showToast('Product removed from cart');
              }
              refRBSheet.current.close();
            } else {
              setShowAlert(true);
            }
          }}
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textStyle: {fontSize: 30, marginTop: 20},
  iamgeContainer: {
    height: 50,
    width: 50,
    borderRadius: 7,
  },
});

export default Screen;
