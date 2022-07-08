import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import logo from '../assets/Images/logo.png';
import TextInput from '../Components/Global/inputComponentWithIcon';
import Heading from '../Components/Global/headerText';
import Button from '../Components/Global/activeButton';
import Text from '../Components/Global/normalText';
import {useNavigation} from '@react-navigation/native';
import WaitingAlert from '../Components/Global/Alerts/waitingAlert';
import SingleButtonAlert from '../Components/Global/Alerts/singleButtonAlert';
import auth from '@react-native-firebase/auth';
import IconPerson from 'react-native-vector-icons/Ionicons';
import * as Colors from '../Constants/Colors';
import imagePicker from '../Functions/Media/imagePicker';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import registerUser from '../Functions/useRegistration/registerUser';
import messaging from '@react-native-firebase/messaging';
import googleLogo from '../assets/Images/google.png';

const height = Dimensions.get('window').height;

const Screen = ({navigation, route}) => {
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
  const [profileImage, setProfileImage] = useState();
  const [googleButtonFlag, setGoogleButtonFlag] = useState(route.params.user);
  const [googleId, setGoogleId] = useState('');
  const [userName, setUserName] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [address, setAddress] = useState('');
  const [messageToken, setMessageToken] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      iosClientId:
        '931690655900-ml7fj2g9m31o2rmustdblve5fhsdak44.apps.googleusercontent.com',
      webClientId:
        '931690655900-lhjl95nuj9a5sip0qnr3gavsha8msk3g.apps.googleusercontent.com',
      offlineAccess: true,
    });
    if (!googleButtonFlag) {
      setEmailAddress(route.params.email);
      setGoogleId(route.params.googleId);
    }
    messaging()
      .getToken()
      .then(token => {
        setMessageToken(token);
      });
  }, []);

  const userHandeler = async googleId => {
    setWaitingAlertFalg(true);
    setGoogleButtonFlag(false);
    const res = await registerUser(
      userName,
      emailAddress,
      cellNumber,
      0,
      0,
      address,
      messageToken,
      profileImage,
      googleId,
    );
    console.log(res);
    setWaitingAlertFalg(false);
    if (res.status == 'Success') {
      Navigator.reset({
        routes: [{name: 'Home', params: {user: res.data}}],
      });
    } else {
      setAlertFlag(true);
      setAlertText(res.message);
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
    verificationHandeler();
  };

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const pinCodeHandler = text => {
    setPinn(text);
    verificationHandeler();
  };

  const buttonHandler = () => {
    if (!googleButtonFlag) {
      userHandeler(googleId);
      return;
    } else {
      setWaitingAlertFalg(true);
      auth()
        .createUserWithEmailAndPassword(emailAddress, pin)
        .then(res => {
          res.user.sendEmailVerification();
          setGoogleId(res.user.uid);
          userHandeler(res.user.uid);
        })
        .catch(error => {
          setWaitingAlertFalg(false);
          if (error.code === 'auth/email-already-in-use') {
            setAlertText('That email address is already in use!');
            setAlertFlag(true);
          } else if (error.code === 'auth/invalid-email') {
            setAlertText('That email address is invalid!');
            setAlertFlag(true);
          } else {
            setWaitingAlertFalg(false);
            setAlertText('Unable to Sign Up');
            setAlertFlag(true);
          }
        });
    }
  };

  const profileImageHandler = async () => {
    imagePicker('ab', setProfileImage);
  };

  const verificationHandeler = () => {
    if (googleButtonFlag) {
      if (
        pin.length >= 6 &&
        emailVerified &&
        userName.length > 0 &&
        cellNumber.length > 7 &&
        cellNumber.length < 14 &&
        emailVerified
      ) {
        setButtonFlag(true);
      } else {
        setButtonFlag(false);
      }
    } else {
      if (
        userName.length > 0 &&
        cellNumber.length > 7 &&
        cellNumber.length < 14
      ) {
        setButtonFlag(true);
      } else {
        setButtonFlag(false);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <SingleButtonAlert
          text={alertText}
          visible={alertFlag}
          onPress={() => setAlertFlag(false)}
        />
        <WaitingAlert visible={waitingAlertFlag} />
        {profileImage == null ? (
          <TouchableOpacity activeOpacity={0.8} onPress={profileImageHandler}>
            <View style={styles.profilePlus}>
              <IconPerson name="person" size={50} color={Colors.white} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={profileImageHandler}>
            <Image source={profileImage.path} style={styles.profileImage} />
          </TouchableOpacity>
        )}
        <View style={{height: '5%'}} />
        <TextInput
          placeHolder={'Enter name'}
          iconName={'person-outline'}
          textHandler={text => {
            setUserName(text);
            verificationHandeler();
          }}
          text={userName}
        />
        {googleButtonFlag && (
          <TextInput
            placeHolder={'Enter mail address'}
            iconName={'mail-outline'}
            text={emailAddress}
            textHandler={emailHandler}
            borderFlag={!emailVerified}
          />
        )}
        {googleButtonFlag && (
          <TextInput
            placeHolder={'Enter pin code'}
            iconName={'key-outline'}
            textHandler={pinCodeHandler}
            text={pin}
          />
        )}
        <TextInput
          placeHolder={'Enter phone number'}
          iconName={'ios-call-outline'}
          text={cellNumber}
          textHandler={text => {
            setCellNumber(text);
            verificationHandeler();
          }}
        />
        <TextInput
          placeHolder={'Enter address optional'}
          iconName={'ios-location-outline'}
          textHandler={text => {
            setAddress(text);
            verificationHandeler();
          }}
          text={address}
        />
        <View style={{height: '5%'}} />
        {googleButtonFlag && (
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
                backgroundColor: Colors.googleColor,
                width: 218,
                alignSelf: 'center',
                marginBottom: 20,
              }}>
              <Image
                source={googleLogo}
                style={{width: 40, height: 40, backgroundColor: Colors.white}}
              />
              <View style={{width: 10}} />
              <Text
                text={'Sign in with Google'}
                style={{color: Colors.white, marginRight: 5}}
              />
            </View>
          </TouchableOpacity>
        )}
        {/* {googleButtonFlag && (
        <GoogleSigninButton
          style={{
            width: 192,
            height: 48,
            alignSelf: 'center',
            marginBottom: 20,
            color: 1,
          }}
          size={GoogleSigninButton.Size.Wide}
          onPress={() =>
            onGoogleButtonPress().then(res => {
              userHandeler(res.user.uid);
            })
          }
        />
      )} */}

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
              color: Colors.primary,
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
    height: (20 / 100) * height,
    alignSelf: 'center',
    aspectRatio: 1,
  },
  profileImage: {
    alignSelf: 'center',
    borderRadius: 100,
    height: 60,
    width: 60,
    marginTop: '10%',
  },
  profilePlus: {
    alignSelf: 'center',
    borderRadius: 100,
    height: 60,
    width: 60,
    marginTop: '10%',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
  },
});

export default Screen;
