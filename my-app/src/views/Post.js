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
      onClick={props.methods.changeView}
    />
  </div>
    <Card className="card">
      <Form methods={props.methods} content={props.content} postMethods={props.postMethods}/>
      <Popup open={props.open} closePopup={props.methods.closePopup} statusOk={props.statusOk}/>
    </Card>
  </div>)
}

export default Post
