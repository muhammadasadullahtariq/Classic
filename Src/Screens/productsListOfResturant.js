import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native';
import FlatListItem from '../Components/Products/flatListItem';
import {recentlyAdded} from '../Data/products';
import Text from '../Components/Global/normalText';
import HeaderText from '../Components/Global/headerText';
import RBSheet from 'react-native-raw-bottom-sheet';
import primary from '../Constants/Colors';
import PlusMinusButton from '../Components/Global/plusMinusButton';
import ResturantList from '../Data/resturants';
import Button from "../Components/Global/button";

const white = 'white';

const windowHeight = Dimensions.get('window').height;

const Screen = props => {
  useEffect(() => {
    refRBSheet.current.open();
  }, []);
  const refRBSheet = useRef();

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              height: 300,
              width: '100%',
              backgroundColor: 'black',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}>
            <Image
              source={ResturantList[3].image}
              style={{
                width: '100%',
                height: 300,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                backgroundColor: 'black',
              }}
            />
          </View>
        )}
        ListHeaderComponentStyle={{marginHorizontal: 0, marginTop: -10}}
        data={recentlyAdded}
        renderItem={items => <FlatListItem item={items.item} />}
        keyExtractor={(item, index) => +item.key}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        height={450}
        width={'90%'}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: primary,
          },
          container: {
            width: '97%',
            alignSelf: 'center',
            borderRadius: 17,
          },
        }}>
        <Image
          style={{
            width: '100%',
            height: 200,
            aspectRatio: 1.9,
            marginTop: -25,
            backgroundColor: primary,
            zIndex: -1,
          }}
          source={recentlyAdded[0].image}
        />
        <HeaderText
          text={recentlyAdded[0].name}
          style={{
            marginTop: 10,
            marginBottom: 0,
            paddingTop: 0,
            paddingLeft: 10,
            fontSize: 30,
          }}
        />
        <Text text={recentlyAdded[0].detail} style={{opacity: 0.6}} />
        <PlusMinusButton count={0} price={45} />
        <View
          style={{
            flex: 1,
            width: '100%',
          }}></View>
        <Button text={'Add to cart'} style={{marginBottom: '7%'}} />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textStyle: {fontSize: 30, marginTop: 20},
  iamgeContainer: {
    height: 50,
    width: 50,
    borderRadius: 7,
  },
});

export default Screen;
