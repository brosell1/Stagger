import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Form from '../components/Form.js';
import Popup from '../components/Popup.js';

const Post = (props) => {
  return(<div>
  <Card style={{
    margin: '2em',
    width: '95vw',
    padding: '2em'
  }}>
    <Form onChange={props.onChange} onClick={props.onClick} tweet={props.tweet} media={props.media} tags={props.tags}/>
    <Popup open={props.open} closePopup={props.closePopup} statusOk={props.statusOk}/>
  </Card>
</div>)
}

export default Post
