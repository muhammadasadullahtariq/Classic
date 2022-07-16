import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Share, StatusBar} from 'react-native';
import profile from '../assets/Images/defaulProfileImage.png';
import HeaderText from '../Components/Global/headerText';
import Text from '../Components/Global/normalText';
import ProfileDetail from '../Components/Profile/iconAndDetail';
import ProfileSeeting from '../Components/Profile/profileSetting';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as COLORS from '../Constants/Colors';
const white = 'white';

const Screen = props => {
  const user = useSelector(state => state.user);
  const [profileImage, setProfileImage] = useState(profile);
  const navigation = useNavigation();
  useEffect(() => {
    if (user.image != '') {
      setProfileImage({uri: user.image});
    }
  }, []);

  const shareHandler = async () => {
    try {
      const result = await Share.share({
        url: 'https://aboutreact.com/react-native-facebook-share/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onPressHandler = text => {
    //console.log(text);
    if (text === 'Share') {
      shareHandler();
    } else navigation.navigate(text);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.imageContainer} />
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <HeaderText text={user.name} />
          <Text text={'@AUT008'} />
        </View>
      </View>
      <View style={{height: 10, width: '100%'}} />
      <ProfileDetail iconName="location-outline" value={user.address} />
      <ProfileDetail iconName="call-outline" value={user.phone} />
      <ProfileDetail iconName="mail-outline" value={user.email} />
      <View style={{height: 20}} />
      <ProfileSeeting
        iconName="heart-outline"
        value={'My Favourites'}
        text={'FavouriteProductsList'}
        onPress={onPressHandler}
      />
      <ProfileSeeting
        iconName="briefcase-outline"
        value={'My purchases'}
        text={'Orders'}
        onPress={onPressHandler}
      />
      <ProfileSeeting
        iconName="share-social-outline"
        value={'Share'}
        text={'Share'}
        onPress={onPressHandler}
      />
      <ProfileSeeting
        iconName="information-circle-outline"
        value={'Support'}
        text={'Support'}
        onPress={onPressHandler}
      />
      <ProfileSeeting
        iconName="settings-outline"
        value={'Settings'}
        text={'SettingScreen'}
        onPress={onPressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: white, flex: 1},
  imageContainer: {
    marginLeft: 20,
    borderRadius: 50,
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  profileContainer: {marginTop: 20, marginLeft: 0, flexDirection: 'row'},
});

export default Screen;
