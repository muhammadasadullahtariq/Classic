import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import logo from '../Asserts/Images/logo.png';
import dhol from '../Asserts/Images/dhol.png';
//import YouTube from 'react-native-youtube';
import Text from '../Components/Global/normalText';
import Options from '../Components/ItemList/unFocusedOption';
import optionsArr from '../Asserts/Strings/detailScreenOptions';
import HeadingText from '../Components/Global/headerText';
import Icon from 'react-native-vector-icons/Feather';
import FlatListItem from '../Components/DetailScreen/flatListItem';
//import YoutubePlayer from 'react-native-youtube-iframe';
import primary from '../Constants/Colors';
import FantText from '../Components/DetailScreen/deatailFant';
import SizeView from '../Components/DetailScreen/sizeView';
import Button from '../Components/Global/button';

const PrimaryColor = primary;
const white = 'white';

const Screen = ({route, navigation}) => {
  const c = useRef();
  const o = useRef();
  const {item} = route.params;
  const [favourtFlag, setFavourtFlag] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [colors, setColors] = useState(['black', 'red']);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );
  const [count, setCount] = useState(0);
  const [imageArr, setImageArr] = useState([logo, dhol, dhol]);
  const [focusedItemIndex, setFocusedItemIndex] = useState(1);
  useEffect(() => {
    console.log(item);
  }, []);

  function renderData(item) {
    return (
      <View style={styles.carouselShadowContainer}>
        <Image source={item.item} style={styles.carouselContainer} />
      </View>
    );
  }

  // function pagination() {
  //   return (
  //     <View style={{marginTop: -50}}>
  //       <Pagination
  //         dotsLength={imageArr.length}
  //         activeDotIndex={activeIndex}
  //         containerStyle={{
  //           backgroundColor: '#00000000',
  //         }}
  //         dotStyle={{
  //           width: 10,
  //           height: 10,
  //           borderRadius: 5,
  //           marginHorizontal: 8,
  //           backgroundColor: primary,
  //         }}
  //         inactiveDotStyle={{
  //           backgroundColor: 'black',
  //         }}
  //         inactiveDotOpacity={0.4}
  //         inactiveDotScale={0.6}
  //       />
  //     </View>
  //   );
  // }

  function optionFunction(items) {
    return <Options name={items.item.name} iconName={items.item.icon} />;
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Image source={item.image} style={styles.carouselContainer} />
        {/* <Carousel
          ref={c}
          data={imageArr}
          renderItem={renderData}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          //loop={true}
          scrollEnabled={true}
          //layout={"tinder"}
          //autoplay={true}
          onSnapToItem={index => setActiveIndex(index)}
        /> */}
        {/* {pagination()} */}

        <View style={styles.headerViewContainer}>
          <HeadingText
            text={item.name}
            style={{
              marginTop: 10,
              marginBottom: 0,
              paddingTop: 0,
              paddingLeft: 10,
              fontSize: 30,
            }}
            viewStyle={{alignSelf: 'center'}}
          />
          <Text
            text={item.about}
            viewStyle={{alignSelf: 'center'}}
            style={{opacity: 0.6}}
          />
        </View>
        <View style={styles.countViewContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Text
              text={'$'}
              style={{opacity: 0.6, color: primary, fontSize: 15}}
              viewStyle={{alignSelf: 'center', marginTop: 5, paddingRight: 0}}
            />
            <Text
              text={count == 0 ? item.price : item.price * count}
              viewStyle={{paddingBottom: 10, marginBottom: 10}}
              style={{
                paddingLeft: 0,
                opacity: count == 0 ? 0.5 : 1,
                fontSize: 30,
              }}
              // viewStyle={{alignSelf: 'center'}}
            />
          </View>
          <View style={{flexDirection: 'row',alignItems:"center"}}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={count == 0 ? true : false}
              onPress={() => setCount(count - 1)}>
              <View
                style={[
                  styles.plusMinusButtonContainer,
                  {backgroundColor: count == 0 ? '#dbdbdb' : '#afafaf'},
                ]}>
                <Icon name="minus" color={white} size={30} />
              </View>
            </TouchableOpacity>
            <Text
              text={count}
              style={{
                fontSize: 35,
                paddingHorizontal: 10,
                color: {primary},
                opacity: count == 0 ? 0.1 : 1,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setCount(count + 1)}>
              <View style={styles.plusMinusButtonContainer}>
                <Icon name="plus" color={white} size={30} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '100%', backgroundColor: 'white'}}>
          <Text style={styles.textContainer} text={item.detail} />
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
          }}></View>
        <Button text={'Add to cart'} style={{marginBottom: '7%'}} />
      </ScrollView>
      {/* <View
        style={{
          backgroundColor: '#00000000',
          width: '100%',
          position: 'absolute',
          // top: windowHeight - 60,
          bottom: 0,
        }}>
        <View
          style={{
            zIndex: 999,
            marginBottom: -20,
            width: '100%',
            backgroundColor: '#00000000',
          }}>
          <Carousel
            ref={o}
            data={optionsArr}
            renderItem={optionFunction}
            sliderWidth={windowWidth}
            itemWidth={100}
            firstItem={2}
            scrollEnabled={true}
            onSnapToItem={index => setFocusedItemIndex(index)}
            containerCustomStyle={{backgroundColor: '#00000000'}}
            contentContainerCustomStyle={{backgroundColor: '#00000000'}}
          />
        </View>
        <View style={styles.bottomViewContainer}>
          <Text
            text={optionsArr[focusedItemIndex].name}
            componentStyle={styles.bottomTextContainer}
          />
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
  },
  carouselShadowContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'blue',

    alignSelf: 'center',
  },
  carouselContainer: {
    width: '100%',
    alignSelf: 'center',
    height: 300,
    backgroundColor: primary,
  },
  textContainer: {
    fontSize: 18,
    width: '100%',
    paddingTop: 10,
    opacity: 0.5,
    paddingHorizontal: 10,
  },
  bottomViewContainer: {
    height: 66,
    width: '100%',
    backgroundColor: primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomTextContainer: {
    color: 'white',
    marginTop: 25,
    alignSelf: 'center',
    padding: 0,
    marginLeft: -40,
  },
  headerViewContainer: {
    width: '100%',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {alignSelf: 'center', marginTop: 10, marginRight: 10},
  countViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    //backgroundColor: 'red',
  },
  plusMinusButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PrimaryColor,
  },
});

export default Screen;
