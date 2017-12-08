import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo500, grey300, grey600, grey800, cyanA400} from 'material-ui/styles/colors';
import './App.css';
import Header from './Header';

// accessibility by public transport - not implemented

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: cyanA400,
    pickerHeaderColor: indigo500,
    accent1Color: grey800,
    accent2Color: grey600,
    accent4Color: grey300
  },
});

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Header />
      </MuiThemeProvider>
    );
  }
}
