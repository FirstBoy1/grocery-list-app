import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Divider, Heading, Text} from 'native-base';
import {useSelector} from 'react-redux';
import moment from 'moment';

import AppHeader from '../../components/AppHeader';
import StatusSection from './components/StatusSection';
import PrioritySection from './components/PrioritySection';

export const GroceryEnteryView = ({route}) => {
  const {entryId} = route.params;
  const entry = useSelector(state =>
    state.groceryList.entries.find(e => e.id === entryId),
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Grocery List">
        <Text style={styles.entryName}>{entry.name}</Text>
      </AppHeader>
      <StatusSection entry={entry} />
      <Divider />
      <PrioritySection entry={entry} />
      <Divider />

      <View style={styles.changeHistory}>
        <Heading size="sm" style={styles.changeHistoryText}>
          Status change history
        </Heading>
        {entry.history.map(h => (
          <View key={h.timeStamp} style={styles.historyList}>
            <Text>
              Date:{' '}
              {moment(new Date(h.timeStamp)).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
            <Text>Status: {h.from ? 'Have' : 'Ran out'}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  entryName: {paddingLeft: 90},
  changeHistory: {padding: 7},
  historyList: {marginVertical: 5},
  changeHistoryText: {marginBottom: 5},
});
