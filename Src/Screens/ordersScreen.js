import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import FlatListItem from '../Components/orders/FlatListItem';
import data from '../Data/orders.js';
import getUserOrders from '../Functions/orders/getUserOrders';
import Toast from 'react-native-root-toast';

const Screen = props => {
  const [orders, setOrders] = useState(data.data);
  useEffect(() => {
    ordersHandler();
  }, []);

  const ordersHandler = async () => {
    const result = await getUserOrders();
    if (result.status === 'Success') {
      setOrders(result.data);
    } else {
      Toast.show('some error occure try again', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

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
