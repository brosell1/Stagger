import React, {Component} from 'react';

class Form extends Component {
  render() {
    return(
      <div>
        <input onChange={this.props.onChange} value={this.props.tweet} name="tweet"/><br/>
        <input onChange={this.props.onChange} value={this.props.media} name="media" type="file" /><br/>
        <button onClick={this.props.onClick} id="submit">submit</button>
      </div>
    );
  };
};

export default Form;
