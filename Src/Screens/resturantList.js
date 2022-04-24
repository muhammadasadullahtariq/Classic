import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import FlatListItem from '../Components/Resturants/flatListItem';
import ResturantList from '../Data/resturants';
import getNearByResturants from '../Functions/Resturants/getNearByResturants';
import InfoText from '../Components/Global/headerText';

const Screen = props => {
  const [resturants, setResturants] = useState(ResturantList);

  useEffect(() => {
    resturantDataHandeler();
  }, []);

  const resturantDataHandeler = async () => {
    const result = await getNearByResturants();
    if (result.status === 'Success') {
      setResturants(result.data);
      console.log(result.data.length);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {resturants.length > 0 ? (
        <FlatList
          data={resturants}
          //columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={items => <FlatListItem item={items.item} />}
          //numColumns={columnNum}
          // key={columnNum}
          keyExtractor={(item, index) => +item.key}
          style={{marginTop: 10, marginHorizontal: 10}}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <InfoText text={'Sorry No Resturant Found'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
});

export default Screen;
