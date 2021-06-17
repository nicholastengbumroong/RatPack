import { Component } from 'react';
import axios from 'axios';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
    };
    // What bind actually do ??
    this.handleInputChange = this.handleInputChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.resetPostForm = this.resetPostForm.bind(this); 
  }

  handleInputChange(event) {
    // object destructuring
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  resetPostForm() {
    this.setState({
      name: '',
      content: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const post = {
      name: this.state.name,
      content: this.state.content,
    };
    axios({
      url: '/api/save',
      method: 'POST',
      data: post,
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetPostForm();
      })
      .catch(() => {
        console.log('Internal server error');
      })
      .then(() => {
        this.props.resetPosts(); 
      });
  }

  render() {
    return (
    <form className='post-form'>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
        </div>
        <input 
          className="u-full-width"
          type='text' 
          name='name'
          placeholder='Enter name'
          value={this.state.name}
          onChange={this.handleInputChange}
        />
      </div>
      <div>
        <div>
          <label htmlFor='content'>Squeak</label>
        </div>
        <textarea
          className="u-full-width"
          type='text'
          name='content'
          rows='5'
          placeholder='Enter squeak'
          value={this.state.content}
          onChange={this.handleInputChange}
        />
      </div>
      <div className='button-parent'>
        <button
          className='post-form-btn'
          disabled={!this.state.name || !this.state.content}
          onClick={this.handleSubmit}
          type='submit'
        >  
        Send It
        </button>
      </div>
      
    </form>
    );
  }
}


export default PostForm;
