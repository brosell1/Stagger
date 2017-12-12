import React from 'react';

import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'

import Form from '../components/Form.js';
import Popup from '../components/Popup.js';

const Post = (props) => {
  return(<div>
    <div style={{
      marginTop: '2em',
      textAlign: 'center',
    }}>
    <RaisedButton
      label={"New Post"}
      style={{marginRight:'1em'}}
      disabled={true}
    />
    <RaisedButton
      label={"Queue"}
      secondary={true}
      onClick={props.changeView}
    />
  </div>
    <Card style={{
      margin: '2em 2.5%',
      width: '95%',
      padding: '2em'
    }}>
      <Form onChange={props.onChange} onClick={props.onClick} tweet={props.tweet} media={props.media} tags={props.tags}/>
      <Popup open={props.open} closePopup={props.closePopup} statusOk={props.statusOk}/>
    </Card>
  </div>)
}

export default Post
