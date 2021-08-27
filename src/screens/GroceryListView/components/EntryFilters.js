import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

export const entryStatus = {
  RANOUT: 'RANOUT',
  HAVE: 'HAVE',
  ALL: 'ALL',
};

const EntryFilters = ({filterBy, setFilterBy}) => {
  return (
    <View style={styles.filterContainer}>
      <Text>Filter by</Text>
      <View style={styles.filterOptions}>
        <TouchableOpacity
          style={styles.filterOption(filterBy === entryStatus.RANOUT)}
          onPress={() => setFilterBy(entryStatus.RANOUT)}>
          <Text style={styles.filterText(filterBy === entryStatus.RANOUT)}>
            Ran out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption(filterBy === entryStatus.HAVE)}
          onPress={() => setFilterBy(entryStatus.HAVE)}>
          <Text style={styles.filterText(filterBy === entryStatus.HAVE)}>
            Have
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterOption(filterBy === entryStatus.ALL)}
          onPress={() => setFilterBy(entryStatus.ALL)}>
          <Text style={styles.filterText(filterBy === entryStatus.ALL)}>
            All
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: selected => ({
    paddingVertical: 7,
    paddingHorizontal: selected ? 15 : 10,
    backgroundColor: selected ? 'brown' : 'white',
    borderRadius: 20,
    marginLeft: 3,
  }),
  filterText: selected => ({color: selected ? 'white' : 'black'}),
});

export default EntryFilters;
