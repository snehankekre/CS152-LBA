import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import ChipInput from 'material-ui-chip-input';

export default class ChipAutofill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
  }

  handleBeforeRequestAdd = (value) => {
    if (!this.props.dataSource.includes(value)) {
      this.setState({
        error: true
      });
      return false;
    }

    this.setState({
      error: false
    });

    return true;
  }

  handleBlur = (e) => {
    let autofillInput = document.getElementById(this.textInput.uniqueId);
    autofillInput.focus();
  }

  render() {
    return (
      <div style={{display: 'inline-block', position: 'relative', width: '70%', margin: '24px 0px 36px 24px'}}>
        <ChipInput
          value={this.props.values}
          onBeforeRequestAdd={this.handleBeforeRequestAdd}
          onRequestAdd={this.props.onRequestAddValue}
          onRequestDelete={this.props.onRequestDeleteValue}
          onBlur={this.handleBlur}
          floatingLabelText={this.props.floatingLabelText}
          hintText={this.props.hintText}
          errorText={this.state.error ? this.props.errorText : null}
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.props.dataSource}
          maxSearchResults={5}
          newChipKeyCodes={[13, 188]}
          style={{minWidth: '50vw'}}
          ref={(input) => { this.textInput = input; }}
        />
      </div>
    );
  }
}

ChipAutofill.propTypes = {
  dataSource: PropTypes.array.isRequired,
  floatingLabelText: PropTypes.string.isRequired,
  hintText: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  onRequestAddValue: PropTypes.func.isRequired,
  onRequestDeleteValue: PropTypes.func.isRequired
}
