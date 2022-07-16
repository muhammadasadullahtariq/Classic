import React, {useEffect, useState, useRef} from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import Check from '../Components/Global/check';
import {StyleSheet, View, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Text from '../Components/Global/normalText';
import Button from '../Components/Global/button';
import postOrder from '../Functions/orders/postOrder';
import {useSelector, useDispatch} from 'react-redux';
import showToast from '../Components/Global/toast';
import {removeAllProducts} from '../Actions/actions';
import HeaderText from '../Components/Global/headerText';
import * as COLORS from '../Constants/Colors';

function App() {
  return (
    <StripeProvider
      publishableKey={
        'pk_test_51L26cCImRAFihXMsLs3w77a1u71zYSRUu3iKnqTPNx4Wf2s4HxiyiHFoBw1CIyc4m5noIe5rIrUxEyN4LXhI4tfi00I0mkUElu'
      }
      merchantIdentifier="merchant.identifier">
      <PaymentScreen />
    </StripeProvider>
  );
}

// PaymentScreen.ts
import {CardField, useStripe} from '@stripe/stripe-react-native';

import {ApplePayButton, useGooglePay} from '@stripe/stripe-react-native';

export default function PaymentScreen({route, navigation}) {
  const {confirmPayment} = useStripe();
  const [selectedItem, setSelectedItem] = useState(0);
  const [location, setLocation] = useState({
    latitude: 29.394644,
    longitude: 71.663875,
  });
  const [arrray, setArray] = useState([
    {text: 'Pay now', status: true},
    {text: 'Pay on delievery', status: false},
  ]);
  const map = useRef(null);
  const products = useSelector(state => state.products);
  const totalPrice = useSelector(state => state.totalPrice);
  const restaurant = useSelector(state => state.resturant);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const orderHandler = async () => {
    console.log(restaurant, 'restaurant');
    var billStatus = false;
    if (selectedItem === 1) {
      billStatus = true;
    }
    console.log(billStatus, 'billStatus');
    const result = await postOrder(
      location,
      products,
      restaurant,
      user.address,
      'asad',
      totalPrice,
      arrray[selectedItem].status,
    );
    console.log(result);
    if (result.status === 'Success') {
      global.visited = false;
      showToast('Order Placed Successfully');
      dispatch(removeAllProducts());
      navigation.pop(2);
    }
  };

  useEffect(() => {
    console.log(products);
    console.log(totalPrice);
    console.log(restaurant);
    console.log(user);
    console.log('user Location\t', user.location);
    setLocation(user.location);
    map.current.animateToRegion(user.location, 1000);
  }, []);

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={{ flexGrow: 1}}>
      <HeaderText
        text={'Confirm Your Location'}
        style={{color: COLORS.primary, marginTop: 10, marginLeft: 10}}
      />
      <View style={{height: 20, width: '100%'}} />
      <MapView
        style={styles.map}
        ref={map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          draggable={true}
          ref={map}
          onDragEnd={e => {
            setLocation(e.nativeEvent.coordinate);
            console.log(e.nativeEvent.coordinate);
            console.log(location);
          }}
        />
      </MapView>
      <HeaderText
        text={'Select Payment Method'}
        style={{color: COLORS.primary, marginTop: 10, marginLeft: 10,marginBottom:10}}
      />
      {arrray.map((item, index) => {
        return (
          <Check
            key={index}
            text={item.text}
            index={index}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            viewStyle={styles.viewContainer}
          />
        );
      })}
      {selectedItem == 0 && (
        <View>
          <CardField
            postalCodeEnabled={true}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              console.log('cardDetails', cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
          <ApplePayButton
            onPress={() => {}}
            type="plain"
            buttonStyle="black"
            borderRadius={4}
            style={styles.payButton}
          />
        </View>
      )}
      <Button
        text={'Place order'}
        style={{marginBottom: 20, marginTop: 20}}
        onPress={() => orderHandler()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  viewContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  map: {
    width: '100%',
    height: 400,
  },
  payButton: {
    height: 60,
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
  },
});
