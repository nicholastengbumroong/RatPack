import { Component } from 'react';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postKey: this.props.postKey, 
      totalComments: this.props.post.comments.length, 
      isDisplayed: false 
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.state.isDisplayed ? this.props.updateKey(null) : this.props.updateKey(this.state.postKey);
    this.setState({isDisplayed: !this.state.isDisplayed});
  }

  render() {
    return (
      <div className='comment-btn-parent'>
        <label htmlFor='comments'>{this.state.totalComments}</label>
        <button 
        className='comment-list-btn'
        onClick={this.handleOnClick}
        >
        Comments
        </button>
      </div>
    );
  }
}

export default Comment;