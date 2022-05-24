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
    //   location,
    //   products,
    //   resturantId,
    //   address,
    //   detail,
    //   totalPrice,
    // [
    //   {
    //     _id: '6237eea3fd079784efbaf0f0',
    //     image: '',
    //     name: 'firstProdect',
    //     price: 100,
    //     quantity: 2,
    //     shortDetail: 'its Pizza yoo',
    //   },
    //   {
    //     _id: '6237ee91fd079784efbaf0eb',
    //     image: '',
    //     name: 'firstProdect 1',
    //     price: 100,
    //     quantity: 2,
    //     shortDetail: 'its Pizza yoo',
    //   },
    // ];
    // {"__v": 10, "_id": "625d106e2b920d62fb561bb4", "address": "Yazman mandi", "createdAt": "2022-04-18T07:17:02.496Z", "deviceId": "eMA-6bd4NUzmni0ODgCDPC:APA91bGX60VvTCLg5iSjDeP4TBXee8847blURwm6UtEl6rW6s2OJa0b-onpBCXRanDFuYI0Cf27FXdyI65QCcoRdXDn_K5RQ5Edn-l9RrXBbB2-s-RQImT6rOKyDvYTBwkD4ZZwNxorG", "email": "asadullahtariq89@gmail.com", "favourties": [], "googleId": "r7jSoxzXRYO4LG8JfltDA5K37j32", "image": "http://localhost:3000/api/1652395872746-980276725-37675BBA-4DE1-46E1-9C2E-901E5E9B5295.jpg", "location": {"latitude": 29.394644, "longitude": 71.663875}, "name": "Asad ullah 8", "orders": [], "phone": "0304562287", "reviews": [], "role": 1, "status": 1, "updatedAt": "2022-05-22T16:50:11.701Z"}
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
    setLocation(user.location);
  }, []);

  return (
    <ScrollView>
      <Text text={'Confirm Your Location'} />
      <View style={{height: 20, width: '100%'}} />
      <MapView
        style={styles.map}
        ref={map}
        initialRegion={{
          latitude: 29.394644,
          longitude: 71.663875,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 29.394644,
            longitude: 71.663875,
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
