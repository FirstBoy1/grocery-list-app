import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider, Text} from 'native-base';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {Routes} from '../../../common';
import {useDispatch} from 'react-redux';
import {removeEntry, toggleSataus} from '../../../redux/groceryListSlice';

const GroceryListItem = ({entry}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.GroceryEntryView, {entryId: entry.id})
      }>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text>{entry.name}</Text>
          <Text style={styles.date}>
            {moment(
              new Date(entry.history[entry.history.length - 1].timeStamp),
            ).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.filterOptions}>
            <TouchableOpacity
              onPress={() => dispatch(toggleSataus(entry.id))}
              style={styles.filterOption({
                selected: !entry.status,
                backgroundColor: 'red',
              })}>
              <Text style={styles.filterText(!entry.status)}>Ran out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(toggleSataus(entry.id))}
              style={styles.filterOption({
                selected: entry.status,
                backgroundColor: 'green',
              })}>
              <Text style={styles.filterText(entry.status)}>Have</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => dispatch(removeEntry(entry.id))}>
            <AntDesignIcons name="delete" size={18} style={styles.delete} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  leftContainer: {flex: 1},
  rightContainer: {flexDirection: 'row', alignItems: 'center'},
  filterOption: ({selected, backgroundColor}) => ({
    paddingVertical: 7,
    paddingHorizontal: selected ? 15 : 10,
    backgroundColor: selected ? backgroundColor : 'white',
    borderRadius: 20,
    marginLeft: 3,
  }),
  filterText: selected => ({color: selected ? 'white' : 'black'}),
  delete: {marginLeft: 7},
  date: {color: 'gray', fontSize: 12},
});

export default GroceryListItem;
