import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native';
import FlatListItem from '../Components/Cart Product/flatListItem';
import {recentlyAdded} from '../Data/products';
import Text from '../Components/Global/normalText';
import HeaderText from '../Components/Global/headerText';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as colors from '../Constants/Colors';
import PlusMinusButton from '../Components/Global/plusMinusButton';
import Button from '../Components/Global/button';
import {useDispatch, useSelector} from 'react-redux';
import {addProduct, removeProduct} from '../Actions/actions';

const Screen = ({navigation, route}) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const refRBSheet = useRef();
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    //refRBSheet.current.open();
  }, []);
  if (products.length > 0) {
    return (
      <View style={styles.mainContainer}>
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
            source={products[selectedItem].image}
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
              if (count > 0)
                dispatch(
                  addProduct({...products[selectedItem], quantity: count}),
                );
              else {
                dispatch(removeProduct(products[selectedItem]));
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
        <Text text={'No Products in Cart'} style={{fontSize: 30}} />
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
