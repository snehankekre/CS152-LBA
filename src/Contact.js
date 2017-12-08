import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    marginLeft: '8.125vw',
    marginRight: 48,
    fontWeight: 400,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '23vw'
  }
};

export default class About extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.headline}>Found a bug? Have your own food recommendations? Contact us!</h2>
        <List className={'contactContent'}>
          <a
            href="https://github.com/jdecked/CS152-LBA"
            target="_blank"
            rel="noopener noreferrer"
            style={{textDecoration: 'none'}}
          >
            <ListItem
              leftIcon={
                <FontIcon className="muidocs-icon-custom-github" />
              }
              primaryText={'https://github.com/jdecked/CS152-LBA'}
            />
          </a>
          <a
            href="mailto:justine@minerva.kgi.edu"
            target="_blank"
            rel="noopener noreferrer"
            style={{textDecoration: 'none'}}
          >
            <ListItem
              leftIcon={
                <CommunicationEmail />
              }
              primaryText={'justine@minerva.kgi.edu'}
            />
          </a>
        </List>
      </div>
    );
  }
}
