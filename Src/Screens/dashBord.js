import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {options} from '../Data/dashBoard.js';
import FlatListItem from '../Components/ItemList/flatListItem';
import TopOptionView from '../Components/DashBoard/topitemView';
import SearchBar from '../Components/Global/SearchComponent';
import * as colors from '../Constants/Colors';
import HeaderText from '../Components/Global/headerText';
import TopCardView from '../Components/DashBoard/topCardView';
import LeftCardView from '../Components/DashBoard/leftCardView';
import RightCardView from '../Components/DashBoard/rightCardView';
import {recentlyAdded} from '../Data/products.js';
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused} from '@react-navigation/native';
import getUserLocation from '../Functions/getUserLocation';
import getSpecificSubCategory from '../Functions/searchProducts/getSpecificSubCategory.js';
import getRecentAddedProducts from '../Functions/searchProducts/getRecentAddedProduct.js';
import Text from '../Components/Global/normalText';
import {useSelector, shallowEqual} from 'react-redux';
import ContextMenu from '../Components/Global/contextMenu';
import checkActiveOrder from '../Functions/orders/getUserActiveOrder';

const white = 'white';

const Screen = ({navigation, route}) => {
  const {userRegistered} = route.params;
  const cartProducts = useSelector(state => state.products, shallowEqual);
  const [columnNum, setColumnNum] = useState(2);
  const [dimensionChange, setDimensionChange] = useState(true);
  const [allProducts, setAllProducts] = useState(true);
  const [location, setLocation] = useState('');
  const [products, setProducts] = useState([]);
  const [contextMenuFlag, setContextMenuFlag] = useState(false); //turn to true after testing
  const isFoused = useIsFocused();

  Dimensions.addEventListener('change', () => {
    setDimensionChange(!dimensionChange);
  });

  useEffect(() => {
    console.log(route);
    if (!global.visited) {
      activeOrderHandler();
    }
    let width = Dimensions.get('window').width;
    if (width <= 480) {
      setColumnNum(2);
    } else if (width <= 786) {
      setColumnNum(3);
    } else if (width <= 1080) {
      setColumnNum(4);
    } else {
      setColumnNum(6);
    }
    handleItemSelection('All');
    if (userRegistered) {
      setContextMenuFlag(false);
      getUserLocation(setLocation);
    }
  }, [dimensionChange, isFoused]);

  const handleItemSelection = async item => {
    var result;
    if (item !== 'All') {
      result = await getSpecificSubCategory(item);
    } else {
      result = await getRecentAddedProducts();
    }
    console.log(result, 'result');
    if (result.status === 'Success') {
      setProducts(result.data);
    } else {
      //setContextMenuFlag(true);
    }
  };

  async function locationHandler(responce, index) {
    setContextMenuFlag(false);
    if (index === 0) {
      getUserLocation(setLocation);
    }
  }

  async function activeOrderHandler() {
    const result = await checkActiveOrder();
    if (result.status === 'Success') {
      navigation.navigate('OrderStatus', {order: result.data});
    }
  }

  return (
    <View style={styles.mainContainer}>
      <ContextMenu
        visible={contextMenuFlag}
        array={['use Current Location', 'use last location']}
        heading="Select Location"
        itemPressed={locationHandler}
        closeMenu={() => setContextMenuFlag(false)}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <SearchBar
          placeHolder="Find Food"
          onPress={() => console.log('i called')}
          mainContainer={{width: '85%'}}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('CartProducts')}
          activeOpacity={0.7}>
          <View style={styles.cartView}>
            <Icon name="cart-outline" size={30} color={colors.primary} />
          </View>
          {cartProducts.length > 0 && (
            <View style={styles.productCountContainer}>
              <Text
                text={cartProducts.length}
                style={{color: white, fontSize: 12, padding: 0}}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <TopOptionView
        setAllProducts={flag => setAllProducts(flag)}
        handleItemSelection={handleItemSelection}
      />

      <FlatList
        ListHeaderComponent={() => {
          if (allProducts) {
            return (
              <View>
                <TopCardView item={options[0]} />
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <LeftCardView item={options[1]} />
                  <View style={{width: '50%'}}>
                    <RightCardView item={options[2]} />
                    <RightCardView item={options[3]} />
                  </View>
                </View>
                <HeaderText text="You May Likes" />
              </View>
            );
          } else {
            return <View />;
          }
        }}
        data={products}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={items => <FlatListItem item={items.item} />}
        numColumns={columnNum}
        key={columnNum}
        keyExtractor={item => item.name}
        style={{marginTop: 10, marginHorizontal: 10}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: '#E8E8E8', flex: 1, marginTop: 40},
  cartView: {
    width: 50,
    height: 50,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  productCountContainer: {
    backgroundColor: colors.primary,
    width: 20,
    minHeight: 20,
    borderRadius: 40,
    marginTop: -15,
    alignSelf: 'flex-end',
    marginRight: -5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Screen;
