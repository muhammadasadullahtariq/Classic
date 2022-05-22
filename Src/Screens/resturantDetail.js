import React, {useState, useEffect, useRef} from 'react';
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
//import reviewsData from '../Data/review';
import ReviewComponent from '../Components/Rating/userRating';
import MapView, {Marker} from 'react-native-maps';
import HeaderText from '../Components/Global/headerText';
import getResturantDetails from '../Functions/Resturants/getResturantDetail';
import getResturantReviews from '../Functions/Resturants/getResturantReviews';
import * as Colors from '../Constants/Colors';
import image from '../Asserts/Images/Restaurant.png';
//import { white } from 'react-native-paper/lib/typescript/styles/colors';

const windowWidth = Dimensions.get('window').width;

const Screen = ({navigation, route}) => {
  const [isReviewSelected, setIsReviewSelected] = useState(false);
  const [data, setData] = useState({
    location: {coordinates: [29.394644, 71.663875]},
  });
  const [reviews, setReviews] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const map = useRef();
  useEffect(() => {
    if (dataLoading) {
      dataHandler();
    } else {
      mapMarkerHandler();
    }
  }, [dataLoading]);

  const dataHandler = async () => {
    const result = await getResturantDetails(route.params.id);
    if (result.status === 'Success') {
      var data = result.data;
      if (data.image != '') {
        data.image = {uri: data.image};
      } else {
        data.image = image;
      }
      setData(data);
      setDataLoading(false);
    }
    const result2 = await getResturantReviews(route.params.id, 1, 10);
    if (result2.status === 'Success') {
      setReviews(result2.data);
    }
  };

  const reviewSelectedHandler = status => {
    setIsReviewSelected(status);
  };

  const mapMarkerHandler = () => {
    console.log('i called');
    map.current.animateToRegion(
      {
        latitude: data.location.coordinates[0],
        longitude: data.location.coordinates[1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000,
    );
  };

  const ImageFunction = () => {
    return (
      <View>
        <Image source={data.image} style={styles.imageContainer} />
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
          {reviews.length > 0 ? (
            <FlatList
              ListHeaderComponent={ImageFunction}
              data={reviews}
              renderItem={items => (
                <ReviewComponent
                  commit={items.item.commint}
                  rating={items.item.rating}
                />
              )}
              keyExtractor={(item, index) => item._id}
            />
          ) : (
            <View>
              <ImageFunction />
              <Text
                text={dataLoading ? 'Loading...' : 'No Reviews'}
                viewStyle={{
                  height: '55%',
                  alignItems: 'center',
                  backgroundColor: 'red',
                }}
              />
            </View>
          )}
        </View>
      ) : (
        <ScrollView
          style={{height: '100%', width: '100%', paddingBottom: 100}}
          contentContainerStyle={{marginBottom: 100, flexGrow: 1}}>
          <ImageFunction />
          <HeaderText
            text={data.name}
            style={{color: primary, marginTop: 10, paddingBottom: 0}}
          />
          <Text
            text={data.detail}
            style={{
              paddingLeft: 10,
              paddingTop: 0,
              opacity: 0.5,
              paddingBottom: 10,
            }}
          />
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
                latitude: data.location.coordinates[0],
                longitude: data.location.coordinates[1],
              }}
            />
          </MapView>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: Colors.white, flex: 1},
  imageContainer: {
    height: 300,
    width: '100%',
  },
  rowButtonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    height: '100%',
    backgroundColor: Colors.brown,
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
