import { Component } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import Like from './Like'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: false,
    };

    this.getPosts = this.getPosts.bind(this);
    this.displayPosts = this.displayPosts.bind(this); 
    this.resetPosts = this.resetPosts.bind(this); 
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

  displayPosts(posts) {
    if (!posts.length) return null;
    posts.reverse(); 
    return posts.map((post, index) => (
      <div className='post-display' key={post._id + index}>
        <div className='post-element'>
          <h5><b>{post.name}</b> • <small>{post.date}</small></h5>
          <p>{post.content}</p>
          <div className='post-bottom-bar'>
            <Like post={post}></Like>
          </div>
        </div> 
        
      </div>
    ));
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
        <h2 className='title'>RatPack</h2>
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
