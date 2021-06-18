import { Component } from 'react';
import axios from 'axios';

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalLikes: this.props.post.likes,
      likeState: true,
      isBtnDisabled: false 
    }

    this.updateLikes = this.updateLikes.bind(this); 
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

  render() {
    return(
      <div className='like-btn-parent'>
        <div className='likes-label'><label htmlFor='likes'>Likes</label></div>
        <button 
          className='like-btn' 
          onClick={this.updateLikes}
          disabled={this.state.isBtnDisabled} 
        >
          {this.state.totalLikes}
        </button>
      </div>
    )
  }

}

export default Like; 