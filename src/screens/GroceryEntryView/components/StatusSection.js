import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {useDispatch} from 'react-redux';
import {toggleSataus} from '../../../redux/groceryListSlice';

const StatusSection = ({entry}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.entryRowContainer}>
      <Text>Status</Text>
      <View style={styles.entryRightContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  entryRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
  },
  entryRightContainer: {
    flexDirection: 'row',
  },
  filterOption: ({selected, backgroundColor}) => ({
    paddingVertical: 7,
    paddingHorizontal: selected ? 15 : 10,
    backgroundColor: selected ? backgroundColor : 'white',
    borderRadius: 20,
    marginLeft: 3,
  }),
  filterText: selected => ({color: selected ? 'white' : 'black'}),
});

export default StatusSection;
