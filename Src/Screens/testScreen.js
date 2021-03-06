import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import HeaderText from '../Components/Global/headerText';
import NormalText from '../Components/Global/normalText';
import Button from '../Components/Global/button';
import ActiveButton from '../Components/Global/activeButton';
import SingleButtonAlert from '../Components/Global/Alerts/singleButtonAlert';
import TwoButtonAlert from '../Components/Global/Alerts/twoButtonAlert';
import WaitingAlert from '../Components/Global/Alerts/waitingAlert';
import InputComponent from '../Components/Global/inputComponentWithIcon';
import Rating from '../Components/Rating/userRating';
import TitleName from '../Components/DashBoard/titleName';

const Screen = () => {
  useEffect(() => {}, []);

  return (
    <View
      style={{backgroundColor: '#cfcfcf', flex: 1, justifyContent: 'center'}}>
      <TitleName name={'Hellow World'} />
    </View>
  );
};

export default Screen;
