import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image,StatusBar} from 'react-native';
import * as COLORS from '../Constants/Colors';
import preparingGif from '../assets/Images/preparing.gif';
import riderGif from '../assets/Images/rider.gif';
import HeaderText from '../Components/Global/headerText';
import Text from '../Components/Global/normalText';

const Screen = ({route, navigation}) => {
  const {order} = route.params;

  useEffect(() => {
    global.visited = true;
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {order.status === 'preparing' ||
        (order.status === 'active' && (
          <>
            <Image
              source={preparingGif}
              style={{width: '100%', height: '45%'}}
            />
            <HeaderText
              text="Preparing your order"
              style={{color: COLORS.primary}}
            />
            <Text
              text="it will take hardly 15 to 20 mints..."
              style={{color: COLORS.brown}}
            />
          </>
        ))}
      {order.status === 'rider' && (
        <>
          <Image source={riderGif} style={{width: '100%', height: '45%'}} />
          <HeaderText
            text="Your food is on the way"
            style={{color: COLORS.primary}}
          />
          <Text
            text="it will take hardly 5 to 10 mints..."
            style={{color: COLORS.brown}}
          />
        </>
      )}
      {order.status === 'ready' && (
        <>
          <HeaderText
            text="Your food is ready"
            style={{color: COLORS.primary, marginTop: 30}}
          />
          <Text
            text="please pick it from the resturant..."
            style={{color: COLORS.brown}}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
});

export default Screen;
