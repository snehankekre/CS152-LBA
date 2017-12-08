import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui-slider-label/Slider';
import muiThemeable from 'material-ui/styles/muiThemeable';
import MapsDirectionsWalk from 'material-ui/svg-icons/maps/directions-walk';
import MapsDirectionsTransit from 'material-ui/svg-icons/maps/directions-transit';
import MapsDirectionsCar from 'material-ui/svg-icons/maps/directions-car';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'baseline',
    margin: '24px 0px 36px 24px',
    maxHeight: 50
  },
  labelStyleOuter: {
    width: '30px',
    height: '30px',
    borderRadius: '50% 50% 50% 0',
    background: '#3F51B5',
    position: 'absolute',
    transform: 'rotate(-45deg)',
    top: '-40px',
    left: '-9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelStyleInner: {
    transform: 'rotate(45deg)',
    color: 'white',
    textAlign: 'center',
    fontSize: '12px'
  },
  icon: {
    width: 36,
    height: 36,
    alignSelf: 'center',
    marginLeft: 4
  }
};

class DistanceSlider extends Component {
  handleChange = (e, value) => {
    this.props.onDistanceChange(value);
  }

  render() {
    let icon = this.props.distance > 2 ?
      (this.props.distance > 15 ?
        <MapsDirectionsCar
          className={'optionalIcon'}
          color={this.props.muiTheme.palette.accent2Color}
          style={styles.icon}
        /> :
        <MapsDirectionsTransit
          className={'optionalIcon'}
          color={this.props.muiTheme.palette.accent2Color}
          style={styles.icon}
        />) :
      <MapsDirectionsWalk
        className={'optionalIcon'}
        color={this.props.muiTheme.palette.accent2Color}
        style={styles.icon}
      />

    return (
      <div style={styles.container}>
        <Slider
          min={0.1}
          max={30}
          step={0.1}
          style={{
            minWidth: '50vw',
            display: 'inline-flex'
          }}
          value={this.props.distance}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          label={
            <div style={styles.labelStyleOuter}>
              <div style={styles.labelStyleInner}>
                {`${this.props.distance.toFixed(1)}`}
              </div>
            </div>
          }
        />
        <span
          style={{
            position: 'relative',
            top: -4.5,
            marginLeft: 24,
            fontFamily: 'Roboto, sans-serif',
            fontSize: 14,
            color: this.props.muiTheme.palette.accent1Color
          }}
        >
          {`${this.props.distance.toFixed(1)}km`}
        </span>
        {icon}
      </div>
    );
  }
}

DistanceSlider.propTypes = {
  distance: PropTypes.number.isRequired,
  onDistanceChange: PropTypes.func.isRequired
}

export default muiThemeable()(DistanceSlider);
