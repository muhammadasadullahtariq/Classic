import React, {useState, useEffect, useRef} from 'react';
import {Image, StyleSheet, View, Animated} from 'react-native';
import * as COLORS from '../Constants/Colors';
import textImage from '../assets/Images/text.png';
import bikeImage from '../assets/Images/bike.png';
import auth from '@react-native-firebase/auth';
import checkUserExist from '../Functions/useRegistration/checkUserExist';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addUser} from '../Actions/actions';

var userStatus = '';
const Screen = () => {
  const Navigator = useNavigation();
  const dispatch = useDispatch();
  const position = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    if (auth().currentUser !== null) {
      userHandeler(auth().currentUser.uid);
    } else {
      userStatus = 'Fail';
    }
    Animated.sequence([
      Animated.timing(position, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(position, {
        toValue: 250,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log('user Status', userStatus);
      console.log('done', userStatus);
      if (userStatus === 'Success') {
        Navigator.reset({
          routes: [{name: 'Home', params: {user: user.data}}],
        });
      } else {
        Navigator.reset({
          routes: [
            {
              name: 'SignUp',
              params: {
                user: false,
                email: auth().currentUser.email,
                googleId: auth().currentUser.uid,
              },
            },
          ],
        });
      }
    });
  }, []);

  const userHandeler = async googleId => {
    const user = await checkUserExist(googleId);
    if (user.status == 'Success') {
      global.user = user.data._id;
      dispatch(addUser(user.data));
      userStatus = 'Success';
      console.log('user Status', userStatus);
    } else {
      userStatus = 'Fail';
      console.log('user Status', userStatus);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Animated.Image
        source={bikeImage}
        style={{
          width: '100%',
          height: 100,
          resizeMode: 'contain',
          transform: [{translateX: position}],
        }}
      />
      <Image
        source={textImage}
        style={{
          width: '100%',
          height: 100,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.brown,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen;
