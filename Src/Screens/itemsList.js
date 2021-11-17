import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import FlatListItem from '../Components/ItemList/flatListItem';
import image from '../Asserts/Images/dhol.png';

const screen = props => {
  const [itemList, setItemList] = useState([
    {source: image, price: '3000', name: 'Dhole'},
  ]);
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <FlatListItem item={itemList[0]} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: '#E8E8E8'},
});

export default screen;
