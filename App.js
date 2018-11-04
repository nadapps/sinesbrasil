import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './src/screens/HomeScreen';
import SinesScreen from './src/screens/SinesScreen';
import SineScreen from './src/screens/SineScreen';

const Stack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Sines: { screen: SinesScreen },
    Sine: { screen: SineScreen },
    Main: {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      header:null
    }
  }
);

export default Stack;