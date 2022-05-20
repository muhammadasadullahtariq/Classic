import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import TextInput from '../Components/Global/inputComponentWithIcon';
import Button from '../Components/Global/activeButton';
import Text from '../Components/Global/normalText';
import {useNavigation} from '@react-navigation/native';
import WaitingAlert from '../Components/Global/Alerts/waitingAlert';
import SingleButtonAlert from '../Components/Global/Alerts/singleButtonAlert';
import profile from '../Asserts/Images/defaulProfileImage.png';
import IconPerson from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import * as colors from '../Constants/Colors';
import imagePicker from '../Functions/Media/imagePicker';
import Toast from 'react-native-root-toast';
import {useDispatch} from 'react-redux';
import getUserById from '../Functions/useRegistration/getUserById';
import updateUser from '../Functions/useRegistration/updateUser';
import {addUser} from '../Actions/actions';

const height = Dimensions.get('window').height;

const Screen = ({navigation, route}) => {
  const user = useSelector(state => state.user);
  const Navigator = useNavigation();
  const [buttonText, setButtonText] = useState('Update');
  const [buttonFlag, setButtonFlag] = useState(true);
  const [alertText, setAlertText] = useState('Please Enter Name');
  const [alertFlag, setAlertFlag] = useState(false);
  const [waitingAlertFlag, setWaitingAlertFalg] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [userName, setUserName] = useState(user.name);
  const [cellNumber, setCellNumber] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [oldImage, setOldImage] = useState(user.image);
  const [imageChanged, setImageChanged] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.image != '') {
      console.log('asad', user.image);
      setProfileImage({uri: user.image});
    }
    setImageChanged(false);
  }, []);

  const userHandeler = async () => {
    setWaitingAlertFalg(true);
    const res = await updateUser(
      userName,
      cellNumber,
      address,
      profileImage,
      imageChanged,
      oldImage,
    );
    console.log(res);
    setWaitingAlertFalg(false);
    if (res.status === 'Success') {
      Toast.show('Profile Updated Successfully', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      const user = await getUserById();
      console.log(user, 'is user');
      if (user.status === 'Success') {
        dispatch(addUser(user.data));
      }
    } else {
      Toast.show('Some Error Occure Please Try Again Latter', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  //   async function onGoogleButtonPress() {
  //     // Get the users ID token
  //     const {idToken} = await GoogleSignin.signIn();

  //     // Create a Google credential with the token
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //     // Sign-in the user with the credential
  //     return auth().signInWithCredential(googleCredential);
  //   }

  //   const pinCodeHandler = text => {
  //     setPinn(text);
  //     verificationHandeler();
  //   };

  //   const buttonHandler = () => {
  //     if (!googleButtonFlag) {
  //       userHandeler(googleId);
  //       return;
  //     } else {
  //       setWaitingAlertFalg(true);
  //       auth()
  //         .createUserWithEmailAndPassword(emailAddress, pin)
  //         .then(res => {
  //           res.user.sendEmailVerification();
  //           setGoogleId(res.user.uid);
  //           userHandeler(res.user.uid);
  //         })
  //         .catch(error => {
  //           setWaitingAlertFalg(false);
  //           if (error.code === 'auth/email-already-in-use') {
  //             setAlertText('That email address is already in use!');
  //             setAlertFlag(true);
  //           } else if (error.code === 'auth/invalid-email') {
  //             setAlertText('That email address is invalid!');
  //             setAlertFlag(true);
  //           } else {
  //             setWaitingAlertFalg(false);
  //             setAlertText('Unable to Sign Up');
  //             setAlertFlag(true);
  //           }
  //         });
  //     }
  //   };

  const profileImageHandler = async () => {
    imagePicker('ab', setProfileImage, setImageChanged);
  };

  const verificationHandeler = () => {
    if (
      userName.length > 0 &&
      cellNumber.length > 7 &&
      cellNumber.length < 14
    ) {
      setButtonFlag(true);
    } else {
      setButtonFlag(false);
    }
  };

  return (
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
            <IconPerson name="person" size={50} color={colors.white} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={0.8} onPress={profileImageHandler}>
          <Image
            source={imageChanged ? profileImage.path : profileImage}
            style={styles.profileImage}
          />
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

      <Button text={buttonText} active={buttonFlag} onPress={userHandeler} />
      {/* <View style={{flex: 1}} />
      <TouchableOpacity
        onPress={() => {
          Navigator.navigate('SignIn');
        }}
        activeOpacity={0.7}>
        <Text
          text={'Already have account'}
          style={{
            color: colors.primary,
            fontSize: 10,
            alignSelf: 'center',
            marginBottom: 30,
          }}
        />
      </TouchableOpacity> */}
    </View>
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
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
});

export default Screen;
