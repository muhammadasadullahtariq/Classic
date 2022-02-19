import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import Text from '../Global/normalText';
import primary from '../Global/Colors';

const screen = props => {
  const [toptionsArray, setOptionsArray] = useState([
    'All',
    'Metal',
    'Paper',
    'Plastic',
    'Mixed',
  ]);
  const [selected, setSelected] = useState('All');
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {toptionsArray.map(item => {
          return (
            <View style={{marginHorizontal: 10}}>
              {selected == item && (
                <View>
                  <Text text={item} componentStyle={{color: primary}} />
                  <View style={{height: 5, backgroundColor: primary}} />
                </View>
              )}
              <TouchableOpacity onPress={() => setSelected(item)}>
                {selected != item && <Text text={item} />}
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
