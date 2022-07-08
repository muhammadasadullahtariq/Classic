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
import {Card} from 'react-native-shadow-cards';
import {useNavigation} from '@react-navigation/native';
import getUserLocation from '../Functions/getUserLocation';
import getSpecificSubCategory from '../Functions/searchProducts/getSpecificSubCategory.js';
import getRecentAddedProducts from '../Functions/searchProducts/getRecentAddedProduct.js';
import Text from '../Components/Global/normalText';
import {useSelector} from 'react-redux';

const white = 'white';

const Screen = props => {
  const navigation = useNavigation();
  const cartProducts = useSelector(state => state.products);
  const [columnNum, setColumnNum] = useState(2);
  const [dimensionChange, setDimensionChange] = useState(true);
  const [allProducts, setAllProducts] = useState(true);
  const [location, setLocation] = useState('');
  const [products, setProducts] = useState([]);

  Dimensions.addEventListener('change', () => {
    setDimensionChange(!dimensionChange);
  });

  useEffect(() => {
    console.log(options, 'loop');
    global.user = '625d106e2b920d62fb561bb4';
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
    getUserLocation(setLocation);
    handleItemSelection('All');
  }, [dimensionChange]);

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
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //justifyContent: 'space-around',
          //backgroundColor: white,
        }}>
        {/* <TouchableOpacity
          onPress={() => console.log('I pressed')}
          activeOpacity={0.7}>
          <Card style={styles.cartView}>
            <Icon name="list-outline" size={30} color={primary} />
          </Card>
        </TouchableOpacity> */}
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
            <View
              style={{
                backgroundColor: colors.primary,
                width: 20,
                minHeight: 20,
                borderRadius: 40,
                marginTop: -15,
                alignSelf: 'flex-end',
                marginRight: -5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
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
});

export default Screen;
