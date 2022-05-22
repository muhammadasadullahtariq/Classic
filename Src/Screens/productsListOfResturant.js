import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
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
import image from '../Asserts/Images/Restaurant.png';

const white = 'white';

const Screen = ({navigation, route}) => {
  //const id=route.params.id;
  const [data, setData] = useState({
    products: [
      {
        image: image,
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
    //refRBSheet.current.open();
  }, []);
  const refRBSheet = useRef();

  const productsHandler = async () => {
    const result = await getResturantProducts('6237eaf14d8b28e766b87b7f');

    console.log(result);
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
          source={data.products[selectedItem].image}
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
        <PlusMinusButton count={0} price={data.products[selectedItem].price} />
        <View
          style={{
            flex: 1,
            width: '100%',
          }}></View>
        <Button text={'Add to cart'} style={{marginBottom: '7%'}} />
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
