import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SwipeableViews from 'react-swipeable-views';

import SocialPeople from 'material-ui/svg-icons/social/people';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
import CommunicationLiveHelp from 'material-ui/svg-icons/communication/live-help';

import About from './About';
import Contact from './Contact';
import DiningRecommender from './DiningRecommender';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0
    };
  }

  handleChangeIndex = (value) => {
    this.setState({
      activeTabIndex: value
    });
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChangeIndex}
          value={this.state.activeTabIndex}
          inkBarStyle={{
            backgroundColor: this.props.muiTheme.palette.primary2Color,
            height: 3,
            marginTop: -3
          }}
        >
          <Tab style={{height: "64px"}} value={0} icon={<MapsLocalDining />} />
          <Tab style={{height: "64px"}} value={1} icon={<SocialPeople />} />
          <Tab style={{height: "64px"}} value={2} icon={<CommunicationLiveHelp />} />
        </Tabs>
        <SwipeableViews
          index={this.state.activeTabIndex}
          onChangeIndex={this.handleChangeIndex}
        >
          <DiningRecommender />
          <About />
          <Contact />
        </SwipeableViews>
      </div>
    );
  }
}

export default muiThemeable()(Header);
