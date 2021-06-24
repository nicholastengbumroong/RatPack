import { Component } from 'react';
import axios from 'axios';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post, 
      name: '',
      content: '',
    };
    // What bind actually do ??
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetPostForm = this.resetCommentForm.bind(this);
  }

  handleInputChange(event) {
    // object destructuring
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  resetCommentForm() {
    this.setState({
      name: '',
      content: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const comment = {
      post: this.state.post, 
      name: this.state.name,
      content: this.state.content,
      likes: 0
    };
    axios({
      url: '/api/save-comment',
      method: 'POST',
      data: comment,
    });
    /*
    Idk why this doesn't work !
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetCommentForm();
      })
      .catch(() => {
        console.log('Internal server error');
      })
      .then(() => {
        this.props.resetPosts();
      });
    */
    console.log('Data has been sent to the server');
    this.resetCommentForm();
    this.props.resetPosts();
  }

  render() {
    return (
      <form className='comment-form'>
        <label htmlFor='name'>Name</label>
        <input
          className="u-full-width"
          type='text'
          name='name'
          placeholder='Enter name'
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <label htmlFor='content'>Comment</label>
        <div className='comment-form-content'>
          <textarea
            className="u-full-width"
            type='text'
            name='content'
            placeholder='Add a comment'
            value={this.state.content}
            onChange={this.handleInputChange}
          />
          <button
            className='comment-form-btn'
            disabled={!this.state.name || !this.state.content}
            onClick={this.handleSubmit}
            type='submit'
          >
            Comment
          </button>
        </div>
        

      </form>
    );
  }
}


export default CommentForm;
