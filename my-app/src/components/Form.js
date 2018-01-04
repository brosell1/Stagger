import React from 'react';

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import DateTime from '../components/DateTime';

const Form = (props) => {
  return(
    <form onSubmit={props.methods.sendTweet} encType="multipart/form-data">
      <TextField
        hintText="Type your post here!"
        multiLine={true}
        onChange={props.methods.handleTweetChange}
        value={props.content.tweet}
        name="tweet"
        fullWidth={true}
      />
      <TextField
        hintText="Enter your tags, separated by a space!"
        onChange={props.methods.handleTagsChange}
        value={props.content.tags}
        name="tags"
        fullWidth={true}
      />
      {/* <input onChange={props.methods.onChange} value={props.content.media} name="media" type="file" /><br/> */}
      {/* <input type="submit" /> */}
      <div style={{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <div>
          <Toggle
            label="Autotag"
            defaultToggled={true}
            labelPosition={'right'}
          />
        </div>
        <DateTime
          date={props.content.date}
          time={props.content.time}
          timeStamp={props.content.timeStamp}
          handleDateChange={props.methods.handleDateChangeExt}
          handleTimeChange={props.methods.handleTimeChangeExt}
        />
        <RaisedButton
          label="Send Tweet"
          onClick={props.sendTweet}
        />
      </div>
    </form>
  );
};

export default Form;
