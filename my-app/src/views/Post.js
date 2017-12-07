import React from 'react';

import Form from '../components/Form.js';
import Popup from '../components/Popup.js';

const Post = (props) => {
  return(<div>
    <Form onChange={props.onChange} onClick={props.onClick} tweet={props.tweet} media={props.media} />
    <Popup open={props.open} closePopup={props.closePopup} statusOk={props.statusOk}/>
  </div>)
}

export default Post
