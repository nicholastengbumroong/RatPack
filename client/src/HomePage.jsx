import React from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import CommentForm from './CommentForm'; 
import Like from './Like';
import Comment from './Comment'; 

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postKey: null, 
      isLoading: false,
      commentsDisplayed: false
    };

    this.getPosts = this.getPosts.bind(this);
    this.displayPosts = this.displayPosts.bind(this); 
    this.resetPosts = this.resetPosts.bind(this); 
    this.updateKey = this.updateKey.bind(this); 
  }

  // once component loads, get and display data
  componentDidMount() {
    this.getPosts();
  }

  // get data from db
  getPosts() {
    this.setState({ isLoading: true });
    axios.get('/api')
      .then((res) => {
        const data = res.data;
        this.setState({ posts: data });
        console.log('Data retrieved from database'); 
      })
      .catch(() => {
        alert('Error retrieving data'); // change to actually handle error
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  displayComments(post) {
    let comments = post.comments.map((comment, index) => {
      return (
        <div className='comment-display' key={comment._id + index}>
          <h5>{comment.name} • <small>{comment.date}</small></h5>
            <div className='comment-content'>
              <p>{comment.content}</p>
              <div className='comment-bottom-bar'>
                <Like post={comment} parent={post} isComment={true}></Like>
              </div>
            </div>
        </div>
      )
    });
    return (
      <div className='comment-list'>
        <CommentForm 
        post={post}
        resetPosts={this.resetPosts}
        displayPosts={this.displayPosts}
        />
        {comments}
      </div>
      
    ); 
  }  

  updateKey(postKeyFromComment) {
    this.setState({postKey: postKeyFromComment});
  }

  displayPosts(posts) {
    if (!posts.length) return null;
    let items = posts.map((post, index) => { 
      return (
        <div className='post-display' key={post._id + index}>
          <div className='post-element'>
            <h5><b>{post.name}</b> • <small>{post.date}</small></h5>
            <p>{post.content}</p>
            <div className='post-bottom-bar'>
              <Comment 
                post={post} 
                postKey={post._id + index} 
                updateKey={this.updateKey}
              />
              <Like post={post}></Like>
            </div>
          </div>
          <div className='post-comment'>
            {this.state.postKey === (post._id + index) ? this.displayComments(post) : null}
          </div> 
        </div>
      )
    });
    return items; 
  }

  resetPosts() {
    this.setState({
      posts: [],
      isLoading: true
    }, () => {
      this.getPosts(); 
      this.displayPosts(this.state.posts);
    });
  }

  render() {
    return (
      <div className='parent'>
        <h2 className='title'>RatPack - Twitter for Rats</h2>
        <PostForm 
          resetPosts={this.resetPosts}
          displayPosts={this.displayPosts}
        />
        <div className='post-list'>{this.displayPosts(this.state.posts)}</div>
      </div>
    );
  }
}

export default HomePage;
