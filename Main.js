import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { ThemeContext, getTheme } from 'react-native-material-ui';

import App from './App';
import colors from './src/utils/colors'

const uiTheme = {
  palette: {
    primaryColor: colors.primary,
    accentColor: colors.accent,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

class Main extends Component {
  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
      <StatusBar backgroundColor={colors.dark} barStyle="light-content"/>
        <App />
      </ThemeContext.Provider>
    );
  }
}

export default Main;