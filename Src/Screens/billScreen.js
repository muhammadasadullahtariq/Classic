import React, {useEffect, useState, useRef} from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import Check from '../Components/Global/check';
import {StyleSheet, View, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Text from '../Components/Global/normalText';
import Button from '../Components/Global/button';
import postOrder from '../Functions/orders/postOrder';
import {useSelector} from 'react-redux';

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

export default function PaymentScreen() {
  const {confirmPayment} = useStripe();
  const [selectedItem, setSelectedItem] = useState(0);
  const [location, setLocation] = useState({
    latitude: 29.394644,
    longitude: 71.663875,
  });
  const [arrray, setArray] = useState([
    {text: 'Pay now'},
    {text: 'Pay on delievery'},
  ]);
  const map = useRef(null);
  const products = useSelector(state => state.products);
  const totalPrice = useSelector(state => state.totalPrice);
  const restaurant = useSelector(state => state.resturant);
  const user = useSelector(state => state.user);

  const orderHandler = async () => {
    const result = await postOrder(
      location,
      products,
      restaurant,
      user.address,
      'asad',
      totalPrice,
      arrray[selectedItem].text,
    );
    console.log(result);
  };

  useEffect(() => {
    console.log(products);
    console.log(totalPrice);
    console.log(restaurant);
    console.log(user);
    console.log('user Location\t', user.location);
    setLocation(user.location);
  }, [location]);

  return (
    <ScrollView>
      <Text text={'Confirm Your Location'} />
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
          onDragEnd={e => {
            setLocation(e.nativeEvent.coordinate);
            console.log(e.nativeEvent.coordinate);
            console.log(location);
          }}
        />
      </MapView>
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
    marginVertical: 10,
    paddingVertical: 5,
  },
  map: {
    width: '100%',
    height: 400,
  },
});
