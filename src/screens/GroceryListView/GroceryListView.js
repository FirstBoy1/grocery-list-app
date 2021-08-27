import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Divider, Heading, Text} from 'native-base';
import {useSelector} from 'react-redux';

import EntryFilters, {entryStatus} from './components/EntryFilters';
import GroceryListItem from './components/GroceryListItem';
import NewEntry from './components/NewEntry';

export const GroceryListView = () => {
  const [filterBy, setFilterBy] = useState(entryStatus.ALL);
  const entries = useSelector(state => state.groceryList.entries);

  let filteredEntries = entries;
  if (filterBy !== entryStatus.ALL) {
    filteredEntries = entries.filter(
      entry =>
        (!entry.status && filterBy === entryStatus.RANOUT) ||
        (entry.status && filterBy === entryStatus.HAVE),
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Heading size="sm">Grocery List</Heading>
      </View>
      <Divider />
      <NewEntry />
      <Divider />
      <EntryFilters filterBy={filterBy} setFilterBy={setFilterBy} />
      <Divider />
      {filteredEntries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>List is empty</Text>
        </View>
      ) : null}
      {filteredEntries.map(entry => (
        <GroceryListItem key={entry.id} entry={entry} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: 'white'},
  titleContainer: {alignItems: 'center', padding: 7},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
