import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

class Form extends Component {
  render() {
    return(
      <form onSubmit={this.props.onClick} encType="multipart/form-data">
        <TextField
          hintText="Type your post here!"
          multiLine={true}
          onChange={this.props.onChange}
          value={this.props.tweet}
          name="tweet"
          fullWidth={true}
        />
        <TextField
          hintText="Enter your tags!"
          onChange={this.props.onChange}
          value={this.props.tags}
          name="tags"
          fullWidth={true}
        />
        {/* <input onChange={this.props.onChange} value={this.props.media} name="media" type="file" /><br/> */}
        {/* <input type="submit" /> */}
        <div style={{
          display:'flex',
          flexDirection: 'row',
        }}>
          <Toggle
            label="Autotag"
            defaultToggled={true}
            labelPosition={'right'}
          />
          <RaisedButton
            label="Send Tweet"
            secondary={true}
          />
        </div>
      </form>
    );
  };
};

export default Form;
