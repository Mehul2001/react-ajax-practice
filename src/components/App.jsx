import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name :' ',
      message : '',
      op : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let postObj = { "name": this.state.name, "message": this.state.message };
    //put ajax in here..
    var server = 'http://ec2-13-57-25-101.us-west-1.compute.amazonaws.com:3000/api/hrsf111/greeting';
    $.ajax({
      url: server,
      type: 'POST',
      data: JSON.stringify(postObj),
      contentType: 'application/json',
      success: function(result) {
         console.log(result);
        this.setState({op: result});
      }.bind(this),
      error: function(error) {
        console.error('error is :', error);
      }
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className='output'>{this.state.op}</h1>
        <h1>Practice </h1>
        <label>
          Name:
          <input type="text" name='name' onChange={this.handleChange}  />
        </label>
        <label>
          Message:
          <input type="text" name='message' onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default App;