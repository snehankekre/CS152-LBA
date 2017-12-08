import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FontIcon from 'material-ui/FontIcon';
import ActionTranslate from 'material-ui/svg-icons/action/translate';
import ContentBlock from 'material-ui/svg-icons/content/block';
import MapsPinDrop from 'material-ui/svg-icons/maps/pin-drop';
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant';
import PlacesRoomService from 'material-ui/svg-icons/places/room-service';

import PriceSlider from './PriceSlider';
import DistanceSlider from './DistanceSlider';
import ChipAutofill from './ChipAutofill';

const cuisinesDataSource = [
    'Japanese',
    'Korean',
    'American Diner',
    'Burgers',
    'Salads',
    'Chinese',
    'Fried Chicken',
    'Indian',
    'Pakistani',
    'Bakery',
    'Dessert',
    'Sandwiches',
    'Juices/Smoothies',
    'Coffee',
    'Tea',
    'Mexican',
    'Italian',
    'Pizza',
    'German',
    'Brunch',
    'Pub Food',
    'Beer',
    'French',
    'Spanish',
    'Fine Dining',
    'Fast Food',
    'Coffee Chain',
    'BBQ',
    'Bulgarian',
    'Salads'
];

const restrictionsDataSource = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Dairy-free',
    'Gluten-free',
    'Nut allergy'
];

const languagesDataSource = [
    'English',
    'French',
    'Korean',
    'Japanese',
    'Chinese'
];

class DiningRecommender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      distance: 1.5,
      price: 3000,
      cuisines: [],
      languages: [],
      restrictions: []
    };
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 4) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handlePriceChange = (price) => {
    this.setState({
      price: price
    });
  }

  handleDistanceChange = (distance) => {
    this.setState({
      distance: distance
    });
  }

  handleRequestAddCuisine = (cuisine) => {
    this.setState(prevState => ({
      cuisines: [...prevState.cuisines, cuisine]
    }));
  }

  handleRequestAddLanguage = (language) => {
    this.setState(prevState => ({
      languages: [...prevState.languages, language]
    }));
  }

  handleRequestAddRestriction = (restriction) => {
    this.setState(prevState => ({
      restrictions: [...prevState.restrictions, restriction]
    }));
  }

  handleRequestDeleteCuisine = (cuisine) => {
    let cuisines = this.state.cuisines.filter((c) => c !== cuisine);
    this.setState({
      cuisines
    });
  }

  handleRequestDeleteLanguage = (language) => {
    let languages = this.state.languages.filter((l) => l !== language);
    this.setState({
      languages
    });
  }

  handleRequestDeleteRestriction = (restriction) => {
    let restrictions = this.state.restrictions.filter((r) => r !== restriction)
    this.setState({
      restrictions
    });
  }

  renderStepActions(step) {
    return (
      <div style={{margin: '0px 0px 12px 0px'}}>
        <FlatButton
          label="Back"
          disabled={this.state.stepIndex === 0}
          disableTouchRipple={true}
          disableFocusRipple={true}
          onClick={this.handlePrev}
        />
        <RaisedButton
          label={this.state.stepIndex < 4 ? "Next" : "Done"}
          icon={this.state.stepIndex < 4 ? '' : <PlacesRoomService />}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginLeft: 12}}
        />
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <div style={{marginLeft: '5vw', maxWidth: '90vw', height: 800}}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation="vertical"
          fullWidth
        >
          <Step>
            <StepButton
              icon={
                <FontIcon
                  className="fa fa-krw"
                  color={
                    this.state.stepIndex === 0 ?
                    this.props.muiTheme.palette.primary1Color :
                    this.props.muiTheme.palette.disabledColor
                  }
                />
              }
              onClick={() => this.setState({stepIndex: 0})}
            >
              What's your budget (in multiples of ₩1,000)?
            </StepButton>
            <StepContent>
              <PriceSlider
                price={this.state.price}
                onPriceChange={this.handlePriceChange}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepButton
              icon={
                <ActionTranslate
                  color={
                    this.state.stepIndex === 1 ?
                    this.props.muiTheme.palette.primary1Color :
                    this.props.muiTheme.palette.disabledColor
                  }
                />
              }
              onClick={() => this.setState({stepIndex: 1})}
            >
              What languages can the menu be available in?
            </StepButton>
            <StepContent>
              <ChipAutofill
                values={this.state.languages}
                floatingLabelText={'Menu Languages'}
                hintText={'Start typing comma-separated languages...'}
                errorText={'Please enter an available language'}
                dataSource={languagesDataSource}
                onRequestAddValue={this.handleRequestAddLanguage}
                onRequestDeleteValue={this.handleRequestDeleteLanguage}
              />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton
              icon={
                <MapsPinDrop
                  color={
                    this.state.stepIndex === 2 ?
                    this.props.muiTheme.palette.primary1Color :
                    this.props.muiTheme.palette.disabledColor
                  }
                />
              }
              onClick={() => this.setState({stepIndex: 2})}
            >
              How far are you willing to go (in km)?
            </StepButton>
            <StepContent>
              <DistanceSlider
                distance={this.state.distance}
                onDistanceChange={this.handleDistanceChange}
              />
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepButton
              icon={
                <MapsRestaurant
                  color={
                    this.state.stepIndex === 3 ?
                    this.props.muiTheme.palette.primary1Color :
                    this.props.muiTheme.palette.disabledColor
                  }
                />
               }
              onClick={(e) => {e.preventDefault(); this.setState({stepIndex: 3})}}
            >
              Which cuisines are you in the mood for?
            </StepButton>
            <StepContent>
              <ChipAutofill
                values={this.state.cuisines}
                floatingLabelText={'Cuisines'}
                hintText={'Start typing comma-separated cuisines...'}
                errorText={'Please enter an available cuisine'}
                dataSource={cuisinesDataSource}
                onRequestAddValue={this.handleRequestAddCuisine}
                onRequestDeleteValue={this.handleRequestDeleteCuisine}
              />
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
          <Step>
            <StepButton
              icon={
                <ContentBlock
                  color={
                    this.state.stepIndex === 4 ?
                    this.props.muiTheme.palette.primary1Color :
                    this.props.muiTheme.palette.disabledColor
                  }
                />
               }
              onClick={() => this.setState({stepIndex: 4})}
            >
              Do you have any dietary restrictions?
            </StepButton>
            <StepContent>
              <ChipAutofill
                values={this.state.restrictions}
                floatingLabelText={'Dietary Restrictions'}
                hintText={'Start typing comma-separated dietary restrictions...'}
                errorText={'Please enter an available dietary restriction'}
                dataSource={restrictionsDataSource}
                onRequestAddValue={this.handleRequestAddRestriction}
                onRequestDeleteValue={this.handleRequestDeleteRestriction}
              />
              {this.renderStepActions(4)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default muiThemeable()(DiningRecommender);
