import { Component } from 'react';
import axios from 'axios';

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalLikes: this.props.post.likes,
      likeState: true,
      isBtnDisabled: false,
      isComment: this.props.isComment || false, 
    }

    this.updateLikes = this.updateLikes.bind(this); 
    this.updateCommentLikes = this.updateCommentLikes.bind(this);
  }

  updateLikes() {
    const targetPost = {
      postID: this.props.post._id,
      likeState: this.state.likeState
    };
    axios({
      url: '/api/like',
      method: 'POST',
      data: targetPost,  
    });
    this.setState(() => {
      let incVal = this.state.likeState ? 1 : -1; 
      return {
        totalLikes: this.state.totalLikes + incVal,
        likeState: !this.state.likeState,
        isBtnDisabled: true
      }
    });

    setTimeout(() => this.setState({isBtnDisabled: false}), 3000);
  }

  updateCommentLikes() {
    const targetPost = {
      parentID: this.props.parent._id, 
      commentID: this.props.post._id,
      likeState: this.state.likeState
    };
    console.log(targetPost); 
    axios({
      url: '/api/comment-like',
      method: 'POST',
      data: targetPost,  
    });
    this.setState(() => {
      let incVal = this.state.likeState ? 1 : -1; 
      return {
        totalLikes: this.state.totalLikes + incVal,
        likeState: !this.state.likeState,
        isBtnDisabled: true
      }
    });

    setTimeout(() => this.setState({isBtnDisabled: false}), 3000);
  }

  render() {
    let bgColor = this.state.likeState ? '#1D1F29' : 'rgb(107, 98, 121)'; 
    return(
      <div className='like-btn-parent'>
        <div className='likes-label'><label htmlFor='likes'>{this.state.totalLikes}</label></div>
        <button 
          className='like-btn' 
          style= {{backgroundColor: bgColor}}
          onClick={this.state.isComment ? this.updateCommentLikes : this.updateLikes}
          disabled={this.state.isBtnDisabled} 
        >
          Like
        </button>
      </div>
    )
  }

}

export default Like; 