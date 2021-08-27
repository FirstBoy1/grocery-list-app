import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Text, Select, CheckIcon} from 'native-base';
import {useDispatch} from 'react-redux';

import {addEntry} from '../../../redux/groceryListSlice';

const PRIORITIES = Array(5)
  .fill(0)
  .map((_, i) => i + 1);

const NewEntry = () => {
  const [priority, setPriority] = useState(1);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleCreate = () => {
    if (!name.trim()) {
      return;
    }
    dispatch(addEntry({name, priority}));
    setName('');
    setPriority(1);
  };

  return (
    <View style={styles.entryContainer}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="New entry name"
      />

      <Select
        selectedValue={priority + ''}
        minWidth={100}
        accessibilityLabel="Select entry priority"
        placeholder="Select entry priority"
        onValueChange={p => setPriority(Number(p))}
        variant="unstyled"
        _selectedItem={{
          bg: 'cyan.600',
          endIcon: <CheckIcon size={4} />,
        }}>
        {PRIORITIES.map(p => {
          p = p + '';
          return <Select.Item key={p} label={p} value={p} />;
        })}
      </Select>

      <TouchableOpacity onPress={handleCreate}>
        <Text style={styles.addBtnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addBtnText: {color: 'blue'},
  priorityContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '50%',
    alignSelf: 'center',
  },
});

export default NewEntry;
