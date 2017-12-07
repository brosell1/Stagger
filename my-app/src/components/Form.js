import React, {Component} from 'react';

class Form extends Component {
  render() {
    return(
      <form onSubmit={this.props.onClick} encType="multipart/form-data">
        <input onChange={this.props.onChange} value={this.props.tweet} name="tweet"/><br/>
        <input onChange={this.props.onChange} value={this.props.media} name="media" type="file" /><br/>
        <input type="submit" />
      </form>
    );
  };
};

export default Form;
