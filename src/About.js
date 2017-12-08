import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
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
  avatars: {
    display: 'flex',
    alignSelf: 'center',
    marginBottom: 12,
    marginTop: 12,
    flexGrow: 0.5,
    height: 125
  },
  paragraph: {
    margin: '12px 8.125vw',
    fontWeight: 300,
    fontSize: 23
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default class About extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.headline}>This app only exists because these kids...</h2>
        <List style={styles.avatars}>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src="images/justine.jpg" size={100} />
            }
          />
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src="images/snehan.jpg" size={100} />
            }
          />
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src="images/yoel.jpg" size={100} />
            }
          />
        </List>
        <p style={styles.paragraph}>
          ...endured astronomical gastronomical confusion at the hands of Seoul
          (and were inspired by the location-based assignment for CS152,
          a course taken by third-years at the Minerva Schools).
        </p>
      </div>
    );
  }
}
