import React from 'react';

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const Form = (props) => {
  return(
    <form onSubmit={props.methods.sendTweet} encType="multipart/form-data">
      <TextField
        hintText="Type your post here!"
        multiLine={true}
        onChange={props.methods.handleChange}
        value={props.content.tweet}
        name="tweet"
        fullWidth={true}
      />
      <TextField
        hintText="Enter your tags!"
        onChange={props.methods.handleChange}
        value={props.content.tags}
        name="tags"
        fullWidth={true}
      />
      {/* <input onChange={props.methods.onChange} value={props.content.media} name="media" type="file" /><br/> */}
      {/* <input type="submit" /> */}
      <div style={{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        <div>
          <Toggle
            label="Autotag"
            defaultToggled={true}
            labelPosition={'right'}
          />
        </div>
        <RaisedButton
          label="Send Tweet"
          onClick={props.sendTweet}
        />
      </div>
    </form>
  );
};

export default Form;
