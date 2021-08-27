import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider, Text} from 'native-base';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const AppHeader = ({title, children}) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.leftContainer}
          onPress={() => navigation.goBack()}>
          <AntDesignIcons name="left" size={18} color="blue" />
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <View style={styles.rightContainer}>{children}</View>
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 3,
  },
  title: {color: 'blue'},
  leftContainer: {flexDirection: 'row', alignItems: 'center'},
  rightContainer: {flex: 1},
});

export default AppHeader;
