import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import Text from '../Global/normalText';
import primary from '../../Constants/Colors';

const screen = props => {
  const [toptionsArray, setOptionsArray] = useState(props.size);
  const [selected, setSelected] = useState();
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {toptionsArray.map(item => {
          return (
            <View style={{marginHorizontal: 10}}>
              {selected == item && (
                <View
                  style={{
                    backgroundColor: primary,
                    borderWidth: 1,
                    borderColor: primary,
                  }}>
                  <Text
                    text={item}
                    componentStyle={{color: 'white', paddingHorizontal: 5}}
                    viewStyle={{marginHorizontal: 5}}
                  />
                </View>
              )}
              <TouchableOpacity onPress={() => setSelected(item)}>
                {selected != item && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'black',
                    }}>
                    <Text text={item} viewStyle={{marginHorizontal: 5}} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
});

export default screen;
