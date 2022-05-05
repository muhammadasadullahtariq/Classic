import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import FlatListItem from '../Components/orders/FlatListItem';
import data from '../Data/orders.js';

const Screen = props => {
  const [orders, setOrders] = useState(data.data);
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={({item, index}) => (
            <FlatListItem item={item} index={index} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <HeaderText text={'Sorry no order found'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default Screen;
