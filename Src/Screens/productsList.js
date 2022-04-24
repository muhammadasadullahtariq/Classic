import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native';
import FlatListItem from '../Components/Products/flatListItem';
import {recentlyAdded} from '../Data/products';
import Text from '../Components/Global/normalText';
import HeaderText from '../Components/Global/headerText';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as colors from '../Constants/Colors';
import PlusMinusButton from '../Components/Global/plusMinusButton';
import ResturantList from '../Data/resturants';
import Button from '../Components/Global/button';
import getSpecificSubCategory from '../Functions/searchProducts/getSpecificSubCategory';

const white = 'white';

const windowHeight = Dimensions.get('window').height;

const Screen = ({route, navigation}) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const refRBSheet = useRef();
  const [products, setProducts] = useState(recentlyAdded);

  useEffect(() => {
    //refRBSheet.current.open();
    handleProduct();
  }, []);

  const handleProduct = async () => {
    const {product} = route.params;
    console.log(product);
    var result = await getSpecificSubCategory(product);
    if (result.status === 'Success') {
      setProducts(result.data);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {products.length > 0 ? (
        <FlatList
          ListHeaderComponentStyle={{marginHorizontal: 0, marginTop: -10}}
          data={products}
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
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <HeaderText text={'Sorry No Product Found'} />
        </View>
      )}
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
          source={recentlyAdded[selectedItem].image}
        />
        <HeaderText
          text={recentlyAdded[selectedItem].name}
          style={{
            marginTop: 10,
            marginBottom: 0,
            paddingTop: 0,
            paddingLeft: 10,
            fontSize: 30,
          }}
        />
        <Text
          text={recentlyAdded[selectedItem].detail}
          style={{opacity: 0.6}}
        />
        <PlusMinusButton count={0} price={45} />
        <View
          style={{
            flex: 1,
            width: '100%',
          }}></View>
        <Button
          text={'Add to cart'}
          style={{marginBottom: '7%'}}
          onPress={() => refRBSheet.current.close()}
        />
      </RBSheet>
    </View>
  );
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
