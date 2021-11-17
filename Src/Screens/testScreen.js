import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import HeaderText from '../Components/Global/headerText';
import NormalText from '../Components/Global/normalText';
import Button from '../Components/Global/button';
import ActiveButton from '../Components/Global/activeButton';
import SingleButtonAlert from '../Components/Global/Alerts/singleButtonAlert';
import TwoButtonAlert from '../Components/Global/Alerts/twoButtonAlert';
import WaitingAlert from '../Components/Global/Alerts/waitingAlertComponent';
import InputComponent from '../Components/Global/inputComponentWithIcon';

const screen = () => {
  useEffect(() => {}, []);

  return (
    <View
      style={{backgroundColor: '#cfcfcf', flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          width: 150,
          height: 200,
          backgroundColor: 'white',
          borderRadius: 10,
          alignSelf: 'center',
          shadowOffset: {
            width: 89,
            height: 89,
          },
          shadowOpacity: 0.25,
          shadowColor: 'black',
          elevation: 10,
        }}></View>
    </View>
  );
};

// const styles = StyleSheet({
//   mainContainer: {},
// });

export default screen;
