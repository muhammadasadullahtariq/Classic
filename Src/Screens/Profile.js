import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import asad from '../Asserts/Images/asad.jpeg';
import HeaderText from '../Components/Global/headerText';
import Text from '../Components/Global/normalText';
import ProfileDetail from '../Components/Profile/iconAndDetail';
import ProfileSeeting from '../Components/Profile/profileSetting';
const white = 'white';

const Screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Image source={asad} style={styles.imageContainer} />
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <HeaderText text={'Asad ullah tariq'} />
          <Text text={'@AUT008'} />
        </View>
      </View>
      <View style={{height: 10, width: '100%'}} />
      <ProfileDetail
        iconName="location-outline"
        value="Yazman mandi bahawalpur"
      />
      <ProfileDetail iconName="call-outline" value="03045622878" />
      <ProfileDetail
        iconName="mail-outline"
        value="asadullahtariq89@gmail.com"
      />
      <View style={{height: 20}} />
      <ProfileSeeting iconName="heart-outline" value={'My Favourites'} />
      <ProfileSeeting iconName="briefcase-outline" value={'My purchases'} />
      <ProfileSeeting iconName="share-social-outline" value={'Support'} />
      <ProfileSeeting iconName="information-circle-outline" value={'Support'} />
      <ProfileSeeting iconName="settings-outline" value={'Settings'} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: white, flex: 1},
  imageContainer: {marginLeft: 20, borderRadius: 50, height: 100, width: 100},
  profileContainer: {marginTop: 20, marginLeft: 0, flexDirection: 'row'},
});

export default Screen;
