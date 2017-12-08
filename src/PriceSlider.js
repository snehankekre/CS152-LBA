import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui-slider-label/Slider';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FontIcon from 'material-ui/FontIcon';

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
  icons: {
    marginLeft: 8
  },
  icon: {
    fontSize: 24,
    alignSelf: 'center'
  }
};

class PriceSlider extends Component {
  handleChange = (e, value) => {
    this.props.onPriceChange(value);
  }

  render() {
    let icon = (
      <div style={styles.icons}>
        <FontIcon
          className="fa fa-krw"
          color={this.props.muiTheme.palette.primary1Color}
          style={styles.icon}
        />
        <FontIcon
          className="fa fa-krw"
          color={
            this.props.price > 10000 ?
            this.props.muiTheme.palette.primary1Color :
            this.props.muiTheme.palette.accent4Color
          }
          style={styles.icon}
        />
        <FontIcon
          className="fa fa-krw"
          color={
            this.props.price > 15000 ?
            this.props.muiTheme.palette.primary1Color :
            this.props.muiTheme.palette.accent4Color
          }
          style={styles.icon}
        />
        <FontIcon
          className="fa fa-krw"
          color={
            this.props.price > 30000 ?
            this.props.muiTheme.palette.primary1Color :
            this.props.muiTheme.palette.accent4Color
          }
          style={styles.icon}
        />
        <FontIcon
          className="fa fa-krw"
          color={
            this.props.price > 70000 ?
            this.props.muiTheme.palette.primary1Color :
            this.props.muiTheme.palette.accent4Color
          }
          style={styles.icon}
        />
      </div>
    )

    return (
      <div style={styles.container}>
        <Slider
          min={1000}
          max={100000}
          step={1000}
          style={{
            minWidth: '50vw',
            display: 'inline-flex'
          }}
          value={this.props.price}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          label={
            <div style={styles.labelStyleOuter}>
              <div style={styles.labelStyleInner}>
                {`${this.props.price/1000}`}
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
          {`₩${this.props.price/1000},000`}
        </span>
        {icon}
      </div>
    );
  }
}

PriceSlider.propTypes = {
  price: PropTypes.number.isRequired,
  onPriceChange: PropTypes.func.isRequired
}

export default muiThemeable()(PriceSlider);
