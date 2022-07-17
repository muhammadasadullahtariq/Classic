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
import Resturant from '../assets/Images/Resturants/tacoBell.jpeg';
import Text from '../Components/Global/normalText';
import primary from '../Constants/Colors';
//import reviewsData from '../Data/review';
import ReviewComponent from '../Components/Rating/userRating';
import MapView, {Marker} from 'react-native-maps';
import HeaderText from '../Components/Global/headerText';
import getResturantDetails from '../Functions/Resturants/getResturantDetail';
import getResturantReviews from '../Functions/Resturants/getResturantReviews';
import * as Colors from '../Constants/Colors';
import image from '../assets/Images/Restaurant.png';
import ProfileDetail from '../Components/Profile/iconAndDetail';
//import { white } from 'react-native-paper/lib/typescript/styles/colors';

const windowWidth = Dimensions.get('window').width;

const Screen = ({navigation, route}) => {
  const [isReviewSelected, setIsReviewSelected] = useState(false);
  const [data, setData] = useState({
    location: {latitude: 29.394644, longitude: 71.663875},
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
        latitude: data.location.latitude,
        longitude: data.location.longitude,
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
      {/* {isReviewSelected ? (
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
      ) : ( */}
      <ScrollView
        style={{height: '100%', width: '100%', paddingBottom: 100}}
        contentContainerStyle={{marginBottom: 100, flexGrow: 1}}>
        {/* <ImageFunction /> */}
        <Image source={data.image} style={styles.imageContainer} />

        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            height: 400,
            borderRadius: 12,
            marginTop: -5,
            backgroundColor: Colors.lightPrimaryColor,
            padding: 10,
            marginBottom: 10,
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowOpacity: 0.25,
            shadowColor: Colors.primary,
            elevation: 2,
          }}>
          <HeaderText
            text={data.name}
            style={{color: primary, marginTop: 10, paddingBottom: 0}}
          />
          <Text
            text={data.CEO}
            style={{opacity: 0.5, paddingLeft: 15, paddingTop: 0, fontSize: 10}}
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
          <ProfileDetail
            iconName="call-outline"
            value={data.phone}
            style={styles.profileContainer}
          />
          <ProfileDetail
            iconName="mail-outline"
            value={data.email}
            style={styles.profileContainer}
          />
          <ProfileDetail
            iconName="location-outline"
            value={data.address}
            style={styles.profileContainer}
          />

          <MapView
            style={styles.map}
            ref={map}
            moveOnMarkerPress={false}
            scrollEnabled={false}
            initialRegion={{
              latitude: 29.394644,
              longitude: 71.663875,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: data.location.latitude,
                longitude: data.location.longitude,
              }}
            />
          </MapView>
        </View>
      </ScrollView>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: Colors.white, flex: 1},
  imageContainer: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: 'black',
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
    height: 200,
  },
  profileContainer: {marginLeft: 0},
});

export default Screen;
