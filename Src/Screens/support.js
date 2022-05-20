import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  Platform,
  AlertIOS,
  Alert,
} from 'react-native';
import TextInput from '../Components/Global/inputComponent';
import Button from '../Components/Global/activeButton';
import support from '../Functions/useRegistration/support';
import Toast from 'react-native-root-toast';

const Screen = props => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [buttonFlag, setButtonFlag] = useState(false);
  useEffect(() => {}, []);

  const handleSubmit = async () => {
    if (message.length > 0 && title.length > 0) {
      const result = await support(title, message);
      if (result.status === 'Success') {
        Toast.show('Your support request has been sent', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      } else {
        Toast.show('Some error occure please try again latter', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    } else {
      notifyMessage('Please fill all the fields');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeHolder={'Enter Title'}
        text={title}
        textHandler={s => {
          setTitle(s);
          if (message.length > 0 && title.length > 0) {
            setButtonFlag(true);
          } else {
            setButtonFlag(false);
          }
        }}
        viewStyle={{width: '95%', marginTop: 20}}
        style={{textAlign: 'left'}}
      />
      <TextInput
        placeHolder={'Enter message'}
        multiLine={true}
        numberOfLines={10}
        text={message}
        textHandler={s => {
          setMessage(s);
          if (message.length > 0 && title.length > 0) {
            setButtonFlag(true);
          } else {
            setButtonFlag(false);
          }
        }}
        viewStyle={{height: 200, width: '95%', marginTop: 20}}
        style={{textAlign: 'left'}}
      />
      <Button
        text={'Send'}
        viewStyle={{marginTop: 30}}
        active={buttonFlag}
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
});

export default Screen;
