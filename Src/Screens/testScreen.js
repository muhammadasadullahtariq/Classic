import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import HeaderText from '../Components/Global/headerText';
import NormalText from '../Components/Global/normalText';
import Button from '../Components/Global/button';
import ActiveButton from '../Components/Global/activeButton';
import SingleButtonAlert from '../Components/Global/Alerts/singleButtonAlert';
import TwoButtonAlert from '../Components/Global/Alerts/twoButtonAlert';
import WaitingAlert from '../Components/Global/Alerts/waitingAlertComponent';

const screen = () => {
  useEffect(() => {}, []);

  return (
    <View>
      <ActiveButton active={true} />
      <Button text={"Press me"}/>
    </View>
  );
};

// const styles = StyleSheet({
//   mainContainer: {},
// });

export default screen;
