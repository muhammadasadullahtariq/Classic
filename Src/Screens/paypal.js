import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

function Screen() {
  function onMessage(e) {
    let data = e.nativeEvent.data;
    let payment = JSON.parse(data);
    if (payment.status === 'COMPLETED') {
      alert('PAYMENT MADE SUCCESSFULLY!');
    } else {
      alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
    }
    //_this.props.navigation.pop(1);
  }

  return (
    <WebView
      useWebKit={true}
      source={{uri: 'https://gamer-79506.web.app/'}}
      style={{flex: 1, width: '100%', height: '100%'}}
      onLoadStart={() => {}}
      onLoadProgress={() => {}}
      onLoadEnd={() => {}}
      onLoad={() => {}}
      onMessage={onMessage}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
});

export default Screen;
