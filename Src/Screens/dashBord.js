import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
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

const white = 'white';

const Screen = props => {
  const navigation = useNavigation();

  const [columnNum, setColumnNum] = useState(2);
  const [dimensionChange, setDimensionChange] = useState(true);
  const [allProducts, setAllProducts] = useState(true);
  const [location, setLocation] = useState('');

  Dimensions.addEventListener('change', () => {
    setDimensionChange(!dimensionChange);
  });

  useEffect(() => {
    console.log(options, 'loop');
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
    getUserLocation(setLocation)
  }, [dimensionChange]);

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
        </TouchableOpacity>
      </View>
      <TopOptionView setAllProducts={flag => setAllProducts(flag)} />

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
        data={recentlyAdded}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={items => <FlatListItem item={items.item} />}
        numColumns={columnNum}
        key={columnNum}
        keyExtractor={(item, index) => +item.key}
        style={{marginTop: 10, marginHorizontal: 10}}
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
