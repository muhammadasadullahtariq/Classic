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
import {GoogleSignin,GoogleSigninButton} from '@react-native-google-signin/google-signin';
import ButtonA from '../Components/Global/button';

const height = Dimensions.get('window').height;

const Screen = () => {
  const Navigator = useNavigation();
  const [buttonText, setButtonText] = useState('Sign in');
  const [buttonFlag, setButtonFlag] = useState(false);
  const [viewFlag, setViewFlag] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [pin, setPinn] = useState('');
  const [emailVerified, setEmailVerified] = useState(true);
  const [alertFlag, setAlertFlag] = useState(false);
  const [waitingAlertFlag, setWaitingAlertFalg] = useState(false);
  const [alertText, setAlertText] = useState('Please Enter Name');

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      iosClientId:
        '931690655900-ml7fj2g9m31o2rmustdblve5fhsdak44.apps.googleusercontent.com',
      webClientId:
        '931690655900-lhjl95nuj9a5sip0qnr3gavsha8msk3g.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

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

  const passWordHandler = text => {
    setPinn(text);
    if (text.length >= 6 && emailVerified) {
      setButtonFlag(true);
    } else {
      setButtonFlag(false);
    }
  };

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);

  }

  const buttonHandler = () => {
    console.log('Button Clicked');
    setWaitingAlertFalg(true);
    auth()
      .signInWithEmailAndPassword(emailAddress, pin)
      .then(() => {
        setWaitingAlertFalg(false);
        // setAlertFlag(true);
        // setAlertText('User account created & signed in!');
        Navigator.navigate('Home');
      })
      .catch(error => {
        setWaitingAlertFalg(false);
        if (error.code === 'auth/email-already-in-use') {
          setAlertFlag(true);
          setAlertText('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setAlertFlag(true);
          setAlertText('That email address is invalid!');
        }
        console.log(error);
        setAlertFlag(true);
        setAlertText('Unable to login, Please try Again!');
        console.log(alertFlag);
        //console.error(error);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <WaitingAlert visible={waitingAlertFlag} />
      <SingleButtonAlert
        text={alertText}
        visible={alertFlag}
        onPress={() => setAlertFlag(false)}
      />
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
        placeHolder={'Enter password'}
        iconName={'key-outline'}
        textHandler={passWordHandler}
      />
      <View style={{height: '5%'}} />
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
       
        onPress={() =>
          onGoogleButtonPress().then(() => Navigator.navigate('Home'))
        }
      />
      <Button text={buttonText} active={buttonFlag} onPress={buttonHandler} />

      <View style={{flex: 1}} />
      <TouchableOpacity
        onPress={() => {
          Navigator.navigate('SignUp');
        }}
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

export default Screen;
