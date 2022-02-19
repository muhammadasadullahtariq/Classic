import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import logo from '../Asserts/Images/logo.png';
import TextInput from '../Components/Global/inputComponentWithIcon';
import Heading from '../Components/Global/headerText';
import Button from '../Components/Global/activeButton';

const height = Dimensions.get('window').height;

const screen = props => {
  const [buttonText, setButtonText] = useState('Verify Number');
  const [buttonFlag, setButtonFlag] = useState(false);
  const [viewFlag, setViewFlag] = useState(false);
  const [cellNumber, setCellNumber] = useState('');
  const [otp, setOtp] = useState('');
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <Image style={styles.imageContainer} source={logo} />
      <Heading text="Login" viewStyle={{alignSelf: 'center'}} />
      <View style={{height: '5%'}} />
      <TextInput placeHolder={'Enter Name'} iconName={'person-outline'} />
      <TextInput placeHolder={'Enter phone number'} iconName={'call-outline'} />
      {/* <TextInput placeHolder={'Enter OTP'} iconName={'key-outline'} /> */}
      <View style={{height: '5%'}} />
      <Button text={buttonText} active={buttonFlag} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  imageContainer: {
    width: '80%',
    height: (30 / 100) * height,
    alignSelf: 'center',
    aspectRatio: 1,
  },
});

export default screen;
