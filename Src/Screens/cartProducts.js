import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import FlatListItem from '../Components/Cart Product/flatListItem';
import {recentlyAdded} from '../Data/products';
import Text from '../Components/Global/normalText';
import HeaderText from '../Components/Global/headerText';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as colors from '../Constants/Colors';
import PlusMinusButton from '../Components/Global/plusMinusButton';
import Button from '../Components/Global/button';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, removeProduct, emptyCart} from '../Actions/actions';
import showToast from '../Components/Global/toast';
import productImage from '../assets/Images/burger.png';
import TwoButtonAlert from '../Components/Global/Alerts/twoButtonAlert';

const Screen = ({navigation, route}) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const refRBSheet = useRef();
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const resturant = useSelector(state => state.resturant);

  useEffect(() => {
    //refRBSheet.current.open();
  }, []);
  if (products.length > 0) {
    return (
      <View style={styles.mainContainer}>
        <TwoButtonAlert
          okOnPress={() => {
            console.log('Ok is pressed');
            setShowAlert(false);
            dispatch(emptyCart());
            if (count > 0) {
              dispatch(
                addProduct({...products[selectedItem], quantity: count}),
              );
              showToast('Cart updated');
            } else {
              dispatch(removeProduct(products[selectedItem]));
              showToast('Product removed from cart');
            }
          }}
          CancleOnPress={() => {
            console.log('Cancel is pressed');
            setShowAlert(false);
          }}
          visible={showAlert}
          text="There is already a product from different resturant in the cart. Do you want empty cart and add this to the cart?"
        />
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <FlatList
          ListHeaderComponentStyle={{marginHorizontal: 0, marginTop: -10}}
          data={products}
          renderItem={items => (
            <FlatListItem
              item={items.item}
              index={items.index}
              onPress={index => {
                setCount(products[index].quantity);
                setSelectedItem(index);
                refRBSheet.current.open();
                console.log(index);
              }}
            />
          )}
          keyExtractor={(item, index) => +item.key}
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
              products[selectedItem].image === ''
                ? productImage
                : {uri: products[selectedItem].image}
            }
          />
          <HeaderText
            text={products[selectedItem].name}
            style={{
              marginTop: 10,
              marginBottom: 0,
              paddingTop: 0,
              paddingLeft: 10,
              fontSize: 30,
            }}
          />
          <Text text={products[selectedItem].detail} style={{opacity: 0.6}} />
          <PlusMinusButton
            count={count}
            setCount={setCount}
            price={products[selectedItem].price}
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
              setSelectedItem(0);
              refRBSheet.current.close();
              if (
                resturant === products[selectedItem].resturantId ||
                resturant === ''
              ) {
                if (count > 0) {
                  dispatch(
                    addProduct({...products[selectedItem], quantity: count}),
                  );
                  showToast('Cart updated');
                } else {
                  dispatch(removeProduct(products[selectedItem]));
                  showToast('Product removed from cart');
                }
              } else {
                setShowAlert(true);
              }
            }}
          />
        </RBSheet>

        <View style={{width: 100, flex: 1}} />
        <Button
          text={'Proceed to Bill'}
          style={{marginBottom: 20}}
          onPress={() => navigation.navigate('CardBillScreen')}
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Text
          text={'No Products in Cart'}
          style={{fontSize: 30, color: colors.brown}}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  textStyle: {fontSize: 30, marginTop: 20},
  iamgeContainer: {
    height: 50,
    width: 50,
    borderRadius: 7,
  },
});

export default Screen;
