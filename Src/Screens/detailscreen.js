import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import logo from '../Asserts/Images/logo.png';
import dhol from '../Asserts/Images/dhol.png';
import YouTube from 'react-native-youtube';
import Text from '../Components/Global/normalText';
import Options from '../Components/ItemList/options';
import optionsArr from '../Asserts/Strings/detailScreenOptions';

const screen = props => {
  const c = useRef();
  const o = useRef();
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const [imageArr, setImageArr] = useState([logo, dhol]);
  useEffect(() => {}, []);

  function renderData(item) {
    //console.error('this is what', item);
    return <Image source={item.item} style={styles.carouselContainer} />;
  }

  function optionFunction(items) {
    return <Options name={items.item.name} iconName={items.item.icon} />;
  }

  return (
    <View style={styles.mainContainer}>
      <Carousel
        ref={c}
        data={imageArr}
        renderItem={renderData}
        sliderWidth={windowWidth}
        itemWidth={windowWidth }
        loop={true}
        scrollEnabled={true}
        //layout={"tinder"}
        autoplay={true}
      />
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <YouTube
          apiKey="AIzaSyD-Z_S2aQFSrEqUo9HW4U7xZGMaPDlMsG4s"
          videoId="KVZ-P-ZI6W4" // The YouTube video ID
          play // control playback of video with true/false
          // fullscreen // control whether the video should play in fullscreen or inline
          loop //
          onReady={() => console.log('i ma ready')}
          onError={e => console.error(e)}
          style={{width: '50%', height: 200}}
          controls={2}
        />
        <View style={{height: 200, width: '48%'}}>
          <Text
            componentStyle={styles.textContainer}
            text={
              'Wikipedia is a free content, multilingual online encyclopedia written and maintained by a community of volunteers through a model of open collaboration, using a wiki-based editing system. Individual contributors, also called editors, are known as Wikipedians. Wikipedia'
            }
          />
        </View>
      </View>
      <View style={{height: 20}} />
      <Carousel
        ref={o}
        data={optionsArr}
        renderItem={optionFunction}
        sliderWidth={windowWidth}
        itemWidth={100}
        loop={true}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  carouselContainer: {
    width: '100%',
    alignSelf: 'center',
    height: 300,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  textContainer: {
    fontSize: 12,
    width: '100%',
    height: 200,
    paddingTop: 0,
  },
});

export default screen;
