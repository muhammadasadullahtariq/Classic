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
import primary from '../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import WaitingAlert from '../Components/Global/Alerts/waitingAlert';
import SingleButtonAlert from '../Components/Global/Alerts/singleButtonAlert';
import auth from '@react-native-firebase/auth';


const height = Dimensions.get('window').height;

const Screen = () => {
  const Navigator = useNavigation();
  const [buttonText, setButtonText] = useState('Sign up');
  const [buttonFlag, setButtonFlag] = useState(false);
  const [viewFlag, setViewFlag] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [pin, setPinn] = useState('');
  const [emailVerified, setEmailVerified] = useState(true);
  const [alertText, setAlertText] = useState('Please Enter Name');
  const [alertFlag, setAlertFlag] = useState(false);
  const [waitingAlertFlag, setWaitingAlertFalg] = useState(false);

  useEffect(() => {}, []);

  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const emailHandler = text => {
    setEmailAddress(text);
    if (validateEmail(text)) {
      setEmailVerified(true);
    } else {
      setEmailVerified(false);
    }
  };

  const pinCodeHandler = text => {
    setPinn(text);
    if (text.length >= 6 && emailVerified) {
      setButtonFlag(true);
    } else {
      setButtonFlag(false);
    }
  };

  const buttonHandler = () => {
    console.log('Button Clicked');
    auth()
      .createUserWithEmailAndPassword(mail, password)
      .then(res => {
        // setAlertText('User account created & signed in!');
        // setAlertFlag(true);
        setWaitingAlertFalg(false);
        res.user.updateProfile({displayName: userName});
        navigation.navigate('Home');
      })
      .catch(error => {
        setWaitingAlertFalg(false);
        if (error.code === 'auth/email-already-in-use') {
          setAlertText('That email address is already in use!');
          setAlertFlag(true);
        }

        if (error.code === 'auth/invalid-email') {
          setAlertText('That email address is invalid!');
          setAlertFlag(true);
        }
        setWaitingAlertFalg(false);
        setAlertText('Unable to Sign Up');
        setAlertFlag(true);
        //console.error(error);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <SingleButtonAlert
        text={alertText}
        visible={alertFlag}
        onPress={() => setAlertFlag(false)}
      />
      <WaitingAlert visible={waitingAlertFlag} />
      <Image style={styles.imageContainer} source={logo} />
      <Heading text="Login" viewStyle={{alignSelf: 'center'}} />
      <View style={{height: '5%'}} />
      <TextInput
        placeHolder={'Enter mail address'}
        iconName={'mail-outline'}
        textHandler={emailHandler}
        borderFlag={!emailVerified}
      />
      <TextInput
        placeHolder={'Enter code'}
        iconName={'key-outline'}
        textHandler={pinCodeHandler}
      />
      <View style={{height: '5%'}} />

      <Button text={buttonText} active={buttonFlag} onPress={buttonHandler} />
      <View style={{flex: 1}} />
      <TouchableOpacity
        onPress={() => {
          Navigator.navigate('SignIn');
        }}
        activeOpacity={0.7}>
        <Text
          text={'Already have account'}
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

export default Screen;
