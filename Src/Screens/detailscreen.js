import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import logo from '../Asserts/Images/logo.png';
import dhol from '../Asserts/Images/dhol.png';
import YouTube from 'react-native-youtube';
import Text from '../Components/Global/normalText';
import Options from '../Components/ItemList/unFocusedOption';
import optionsArr from '../Asserts/Strings/detailScreenOptions';
import HeadingText from '../Components/Global/headerText';
import Icon from 'react-native-vector-icons/Ionicons';
import FlatListItem from '../Components/DetailScreen/flatListItem';
import YoutubePlayer from 'react-native-youtube-iframe';

const screen = props => {
  const c = useRef();
  const o = useRef();
  const [favourtFlag, setFavourtFlag] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );
  const [imageArr, setImageArr] = useState([logo, dhol]);
  const [focusedItemIndex, setFocusedItemIndex] = useState(1);
  useEffect(() => {}, []);

  function renderData(item) {
    return (
      <View style={styles.carouselShadowContainer}>
        <Image source={item.item} style={styles.carouselContainer} />
      </View>
    );
  }

  function optionFunction(items) {
    return <Options name={items.item.name} iconName={items.item.icon} />;
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <Carousel
          ref={c}
          data={imageArr}
          renderItem={renderData}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          //loop={true}
          scrollEnabled={true}
          //layout={"tinder"}
          //autoplay={true}
        />

        <View style={styles.headerViewContainer}>
          {/*Putt the name of selected item here  */}
          <HeadingText
            text="Name"
            componentStyle={{marginTop: 0, marginBottom: 0, paddingTop: 0}}
          />
          <View style={{flex: 1}} />
          <TouchableOpacity
            onPress={() => setFavourtFlag(!favourtFlag)}
            activeOpacity={0.7}>
            {favourtFlag && (
              <View style={styles.iconContainer}>
                <Icon name="heart" size={30} />
              </View>
            )}
            {!favourtFlag && (
              <View style={styles.iconContainer}>
                <Icon name="heart-outline" size={30} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log('i love you asad')}>
            <View style={styles.iconContainer}>
              <Icon name="share-social" size={30} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%'}}>
          <Text
            componentStyle={styles.textContainer}
            text={
              'Wikipedia is a free content, multilingual online encyclopedia written and maintained by a community of volunteers through a model of open collaboration, using a wiki-based editing system. Individual contributors, also called editors, are known as Wikipedians. Wikipedia'
            }
          />
        </View>
        <FlatListItem />
        <FlatListItem />
        <View style={{height: 20}} />
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={'KVZ-P-ZI6W4'}
          //onChangeState={onStateChange}
        />
        <View style={{height: 30, width: 100}} />
      </ScrollView>
      <View
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
            firstItem={1}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#F4F4F4'},
  carouselShadowContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    shadowOffset: {
      width: 89,
      height: 89,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowColor: 'black',
    elevation: 8,
    marginBottom: 10,
  },
  carouselContainer: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'red',
  },
  textContainer: {
    fontSize: 18,
    width: '100%',
    paddingTop: 0,
    opacity: 0.5,
  },
  bottomViewContainer: {
    height: 66,
    width: '100%',
    backgroundColor: '#F7941F',
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
    flexDirection: 'row',
    width: '100%',
  },
  iconContainer: {alignSelf: 'center', marginTop: 5, marginRight: 10},
});

export default screen;
