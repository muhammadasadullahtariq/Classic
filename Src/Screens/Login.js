import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import logo from '../assets/Images/logo.png';
import TextInput from '../Components/Global/inputComponentWithIcon';
import Heading from '../Components/Global/headerText';
import Button from '../Components/Global/activeButton';
import Text from '../Components/Global/normalText';
import * as Color from '../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import WaitingAlert from '../Components/Global/Alerts/waitingAlert';
import SingleButtonAlert from '../Components/Global/Alerts/singleButtonAlert';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import checkUserExist from '../Functions/useRegistration/checkUserExist';
import {addUser} from '../Actions/actions';
import {useDispatch} from 'react-redux';
import googleLogo from '../assets/Images/google.png';
import updateDeviceId from '../Functions/useRegistration/updateDeviceId';

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
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(auth().currentUser, 'current user');
    GoogleSignin.configure({
      scopes: ['email'],
      iosClientId:
        '931690655900-ml7fj2g9m31o2rmustdblve5fhsdak44.apps.googleusercontent.com',
      webClientId:
        '931690655900-lhjl95nuj9a5sip0qnr3gavsha8msk3g.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const userHandeler = async googleId => {
    const user = await checkUserExist(googleId);
    console.log(user);
    console.log(auth().currentUser.email);
    if (user.status == 'Success') {
      global.user = user.data._id;
      dispatch(addUser(user.data));
      await updateDeviceId();
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
              googleId: googleId,
            },
          },
        ],
      });
    }
  };

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
      .then(res => {
        userHandeler(res.user.uid);
      })
      .catch(error => {
        setWaitingAlertFalg(false);
        if (error.code === 'auth/email-already-in-use') {
          setAlertFlag(true);
          setAlertText('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          setAlertFlag(true);
          setAlertText('That email address is invalid!');
        } else if (error.code === 'auth/wrong-password') {
          setAlertFlag(true);
          setAlertText('Wrong Password!');
        } else if (error.code === 'auth/user-not-found') {
          setAlertFlag(true);
          setAlertText('User not found');
        }
        console.log(error);
        setAlertFlag(true);
        setAlertText('Unable to login, Please try Again!');
        console.log(alertFlag);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View style={styles.mainContainer}>
        <WaitingAlert visible={waitingAlertFlag} />
        <SingleButtonAlert
          text={alertText}
          visible={alertFlag}
          onPress={() => setAlertFlag(false)}
        />
        <Image style={styles.imageContainer} source={logo} />
        <Heading
          text="Login"
          viewStyle={{
            alignSelf: 'center',
            //marginLeft: '10%',
          }}
          style={{color: Color.primaryTextColor}}
        />
        <View style={{height: '1%'}} />
        <TextInput
          placeHolder={'Enter mail address'}
          iconName={'mail-outline'}
          Keyboard={'email-address'}
          textHandler={emailHandler}
          borderFlag={!emailVerified}
        />
        <TextInput
          placeHolder={'Enter password'}
          iconName={'key-outline'}
          secureTextEntry={true}
          textHandler={passWordHandler}
        />
        <View style={{height: '5%'}} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            onGoogleButtonPress().then(res => {
              userHandeler(res.user.uid);
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: Color.googleColor,
              width: 218,
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            <Image
              source={googleLogo}
              style={{width: 40, height: 40, backgroundColor: 'white'}}
            />
            <View style={{width: 10}} />
            <Text
              text={'Sign in with Google'}
              style={{color: Color.white, marginRight: 5}}
            />
          </View>
        </TouchableOpacity>
        {/* <GoogleSigninButton
        style={{
          width: 192,
          height: 48,
          alignSelf: 'center',
          marginBottom: 20,
          color: '1',
        }}
        size={GoogleSigninButton.Size.Wide}
        onPress={() =>
          onGoogleButtonPress().then(res => {
            userHandeler(res.user.uid);
          })
        }
      /> */}
        <Button text={buttonText} active={buttonFlag} onPress={buttonHandler} />

        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => {
            Navigator.reset({
              routes: [{name: 'SignUp', params: {user: true}}],
            });
          }}
          activeOpacity={0.7}>
          <Text
            text={'Not have account'}
            style={{
              color: Color.primary,
              fontSize: 10,
              alignSelf: 'center',
              marginBottom: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
