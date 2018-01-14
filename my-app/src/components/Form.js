import React from 'react';
import MediaQuery from 'react-responsive';

import ChipInput from 'material-ui-chip-input';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
      <ChipInput
        hintText="Type a tag, and press enter to add it!"
        // onChange={props.methods.handleTagsChange}
        value={props.content.tags}
        onRequestAdd={(chip) => props.methods.handleAddChip(chip.split(" ").join(""))}
        onRequestDelete={chip => props.methods.handleDeleteChip(chip)}
        name="tags"
        fullWidth={true}
      />
      <input type='file' accept='image/*' value={props.content.media} onChange={props.methods.handleMediaChange}></input>
      {/* <input onChange={props.methods.onChange} value={props.content.media} name="media" type="file" /><br/> */}
      {/* <input type="submit" /> */}
      <MediaQuery minWidth={850}>
      <div style={{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <div>
          <RaisedButton
            label="Autotag"
            onClick={props.methods.autoTag}
          />
        </div>
        <DateTime
          date={props.content.date}
          time={props.content.time}
          timeStamp={props.content.timeStamp}
          handleDateChange={props.methods.handleDateChangeExt}
          handleTimeChange={props.methods.handleTimeChangeExt}
        />
        <div>
          <RaisedButton
            label="Schedule"
            onClick={props.postMethods.scheduleTweet}
          />
        {/* <div>
        </div> */}
          <RaisedButton
            style={{borderLeft: '1px solid white'}}
            label="Post"
            onClick={props.postMethods.sendTweet}
          />
        </div>
      </div>
      </MediaQuery>
      <MediaQuery maxWidth={850}>
        <DateTime
          date={props.content.date}
          time={props.content.time}
          timeStamp={props.content.timeStamp}
          handleDateChange={props.methods.handleDateChangeExt}
          handleTimeChange={props.methods.handleTimeChangeExt}
        />
        <div style={{
          display:'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <div>
            <RaisedButton
              label="Autotag"
              onClick={props.methods.autoTag}
            />
          </div>
          <div>
            <RaisedButton
              style={{ borderLeft: '1px solid white'}}
              label="Schedule"
              onClick={props.postMethods.scheduleTweet}
            />
          </div>
          <div>
            <RaisedButton
              style={{ borderLeft: '1px solid white'}}
              label="Post"
              onClick={props.postMethods.sendTweet}
            />
          </div>
        </div>
      </MediaQuery>
    </form>
  );
};

export default Form;
