import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Routes} from '../common';
import {GroceryListView} from '../screens/GroceryListView/GroceryListView';
import {GroceryEnteryView} from '../screens/GroceryEntryView/GroceryEnteryView';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.GroceryListView}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.GroceryListView} component={GroceryListView} />
      <Stack.Screen
        name={Routes.GroceryEntryView}
        component={GroceryEnteryView}
      />
    </Stack.Navigator>
  );
}
