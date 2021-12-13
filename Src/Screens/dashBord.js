import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, FlatList, Dimensions} from 'react-native';
import FlatListItem from '../Components/ItemList/flatListItem';
import image from '../Asserts/Images/dhol.png';

const screen = props => {
  const [itemList, setItemList] = useState([
    {source: image, price: '3000', name: 'Dhole', key: '0'},
    {source: image, price: '3000', name: 'Dhole', key: '1'},
    {source: image, price: '3000', name: 'Dhole', key: '2'},
    {source: image, price: '3000', name: 'Dhole', key: '3'},
  ]);
  const [columnNum, setColumnNum] = useState(2);
  //const [columnWidth, setColumnWidth] = useState(2);
  const [dimensionChange, setDimensionChange] = useState(true);

  Dimensions.addEventListener('change', () => {
    setDimensionChange(!dimensionChange);
  });

  useEffect(() => {
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
  }, [dimensionChange]);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={itemList}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={items => <FlatListItem item={items.item} />}
        numColumns={columnNum}
        key={columnNum}
        keyExtractor={(item, index) => +item.key}
        style={{marginTop: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: '#E8E8E8', flex: 1},
});

export default screen;
