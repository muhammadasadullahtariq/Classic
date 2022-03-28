import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import Resturant from '../Asserts/Images/Resturants/tacoBell.jpeg';
import Text from '../Components/Global/normalText';
import primary from '../Constants/Colors';
import reviewsData from '../Data/review';
import ReviewComponent from '../Components/Rating/userRating';
import MapView from 'react-native-maps';
import HeaderText from '../Components/Global/headerText';
//import { white } from 'react-native-paper/lib/typescript/styles/colors';

const brown = '#dbdbdb';
const white = '#ffffff';

const windowWidth = Dimensions.get('window').width;

const Screen = props => {
  const [isReviewSelected, setIsReviewSelected] = useState(false);
  useEffect(() => {}, []);

  const reviewSelectedHandler = status => {
    setIsReviewSelected(status);
  };

  const ImageFunction = () => {
    return (
      <View>
        <Image source={Resturant} style={styles.imageContainer} />
        <View style={styles.rowButtonContainer}>
          <TouchableOpacity onPress={() => reviewSelectedHandler(false)}>
            <View style={styles.buttonStyle}>
              <Text text={'Deatil'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => reviewSelectedHandler(true)}>
            <View style={styles.buttonStyle}>
              <Text text={'Reviews'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {isReviewSelected ? (
        <View>
          <FlatList
            ListHeaderComponent={ImageFunction}
            data={reviewsData}
            renderItem={items => (
              <ReviewComponent
                commit={items.item.commit}
                rating={items.item.rating}
              />
            )}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      ) : (
        <ScrollView
          style={{height: '100%', width: '100%', paddingBottom: 100}}
          contentContainerStyle={{marginBottom: 100, flexGrow: 1}}>
          <ImageFunction />
          <HeaderText
            text={'TocaBell'}
            style={{color: primary, marginTop: 10, paddingBottom: 0}}
          />
          <Text
            text={
              'A place where you can find everything to eat and drink .i promise you love to visit us.'
            }
            style={{
              paddingLeft: 10,
              paddingTop: 0,
              opacity: 0.5,
              paddingBottom: 10,
            }}
          />
          <MapView
            style={styles.map}
            //specify our coordinates.
            scrollEnabled={false}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
         
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: 'white', flex: 1},
  imageContainer: {
    height: 300,
    width: '100%',
  },
  rowButtonContainer: {
    flexDirection: 'row',
    backgroundColor: white,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    height: '100%',
    backgroundColor: brown,
    width: windowWidth / 2 - 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  map: {
    width: '100%',
    height: 400,
    
  },
});

export default Screen;
