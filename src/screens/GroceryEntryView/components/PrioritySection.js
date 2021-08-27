import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {useDispatch} from 'react-redux';

import {updatePriority} from '../../../redux/groceryListSlice';

const PRIORITIES = Array(5)
  .fill(0)
  .map((_, i) => i + 1);

const PrioritySection = ({entry}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.entryRowContainer}>
      <Text>Priority</Text>

      <View>
        <View style={styles.entryRightContainer}>
          {PRIORITIES.map(p => (
            <TouchableOpacity
              key={p}
              style={styles.priority(entry.priority === p)}
              onPress={() =>
                dispatch(updatePriority({id: entry.id, priority: p}))
              }>
              <Text style={styles.priorityText(entry.priority === p)}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  priority: selected => ({
    backgroundColor: selected ? 'green' : 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  }),
  priorityText: selected => ({
    color: selected ? 'white' : 'black',
  }),
});

export default PrioritySection;
