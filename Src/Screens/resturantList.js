import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import FlatListItem from "../Components/Resturants/flatListItem";
import ResturantList from "../Data/resturants";

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={ResturantList}
        //columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={items => <FlatListItem item={items.item} />}
        //numColumns={columnNum}
        // key={columnNum}
        keyExtractor={(item, index) => +item.key}
        style={{marginTop: 10, marginHorizontal: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
});

export default screen;
