import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import logo from '../Asserts/Images/logo.png';
import TextInput from '../Components/Global/inputComponentWithIcon';
import Heading from '../Components/Global/headerText';
import Button from '../Components/Global/activeButton';
import Text from '../Components/Global/normalText';
import primary from '../Components/Global/Colors';

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
      <TextInput placeHolder={'Enter Cell Number'} iconName={'call-outline'} />
      <TextInput placeHolder={'Enter OTP'} iconName={'key-outline'} />
      <View style={{height: '5%'}} />

      <Button text={buttonText} active={buttonFlag} />
      <View style={{flex: 1}} />
      <TouchableOpacity
        onPress={() => console.log('Hello i am here')}
        activeOpacity={0.7}>
        <Text
          text={'Not have account'}
          style={{
            color: primary,
            fontSize: 10,
            alignSelf: 'center',
            marginBottom: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  imageContainer: {
    width: '80%',
    height: (30 / 100) * height,
    alignSelf: 'center',
    aspectRatio: 1,
  },
});

export default screen;
