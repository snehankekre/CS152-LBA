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
import recommend from './recommend';

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
    this.required = [0, 1, 2, 3]
    this.state = {
      price: 3000,
      distance: 1.5,
      cuisines: [],
      languages: [],
      restrictions: [],
      stepIndex: 0,
      recommendations: []
    };

    this.styles = {
      recommendations: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
        color: this.props.muiTheme.palette.accent1Color,
        margin: '24px 0px 36px 24px'
      }
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    const requiredValues = [
      this.state.price,
      this.state.languages.length,
      this.state.distance,
      this.state.cuisines.length
    ];

    if (stepIndex < 4 && requiredValues[stepIndex] > 0) {
      this.setState({
        stepIndex: stepIndex + 1
      });
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

  handleSubmit = (e) => {
    const {
      price,
      distance,
      cuisines,
      languages,
      restrictions,
      ...rest
    } = this.state;

    let recommendations = recommend(
      price/1000,
      distance,
      languages,
      cuisines,
      restrictions
    );

    this.setState({
      stepIndex: this.state.stepIndex + 1,
      recommendations
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
        {this.state.stepIndex !== 5 ? <RaisedButton
          label={this.state.stepIndex < 4 ? "Next" : "Done"}
          icon={this.state.stepIndex < 4 ? '' : <PlacesRoomService />}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.state.stepIndex < 4 ? this.handleNext : this.handleSubmit}
          style={{marginLeft: 12}}
        /> : null}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <div
        className={'diningRecommender'}
        style={{maxWidth: '100vw', maxHeight: '100vh'}}
      >
        <Stepper
          activeStep={stepIndex}
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
              What's your budget?
            </StepButton>
            <StepContent className={'stepContent'}>
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
            <StepContent className={'stepContent'}>
              <ChipAutofill
                values={this.state.languages}
                floatingLabelText={'Menu Languages'}
                hintText={'Type a language and hit enter...'}
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
            <StepContent className={'stepContent'}>
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
            <StepContent className={'stepContent'}>
              <ChipAutofill
                values={this.state.cuisines}
                floatingLabelText={'Cuisines'}
                hintText={'Type a cuisine and hit enter...'}
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
            <StepContent className={'stepContent'}>
              <ChipAutofill
                values={this.state.restrictions}
                floatingLabelText={'Dietary Restrictions'}
                hintText={'Type a dietary restriction and hit enter...'}
                errorText={'Please enter an available dietary restriction'}
                dataSource={restrictionsDataSource}
                onRequestAddValue={this.handleRequestAddRestriction}
                onRequestDeleteValue={this.handleRequestDeleteRestriction}
              />
              {this.renderStepActions(4)}
            </StepContent>
          </Step>
          {this.state.stepIndex === 5 ? (<Step>
            <StepButton
              icon={
                <PlacesRoomService
                  color={
                    this.state.stepIndex === 5 ?
                    this.props.muiTheme.palette.primary1Color :
                    this.props.muiTheme.palette.disabledColor
                  }
                />
               }
              onClick={() => this.setState({stepIndex: 5})}
            >
              Restaurant Recommendations
            </StepButton>
            <StepContent className={'stepContent'}>
              {this.state.recommendations.length > 0 ? (
                <div style={this.styles.recommendations}>
                  You should check out the following places which match your criteria:
                  {this.state.recommendations.map(
                    (recommendation) => {
                      return (
                        <div style={{marginLeft: 24}} key={recommendation}>
                          <br />- <b>{recommendation}</b>
                        </div>
                      );
                    }
                  )}
                </div>
                ) : (
                  <div style={this.styles.recommendations}>
                    Sorry! No places matched your criteria. Better luck next time. :(
                  </div>
                )
              }
              {this.renderStepActions(5)}
            </StepContent>
          </Step>) : null}
        </Stepper>
      </div>
    );
  }
}

export default muiThemeable()(DiningRecommender);
