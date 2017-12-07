import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class Popup extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closePopup}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.closePopup}
      />,
    ];
  return <Dialog
      title={this.props.statusOk ? "Thank you for posting!" : "Something went wrong!"}
      actions={actions}
      modal={false}
      open={this.props.open}
      onRequestClose={this.props.closePopup}
      />
  }
}
