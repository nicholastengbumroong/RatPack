import React from 'react';
import axios from 'axios';
import PostForm from './PostForm';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: false,
    };

    this.getPosts = this.getPosts.bind(this);
    this.displayPosts = this.displayPosts.bind(this); 
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
        console.log('Data has been received');
      })
      .catch(() => {
        alert('Error retrieving data'); // change to actually handle error
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  displayPosts(posts) {
    console.log(posts);
    if (!posts.length) return null;
    posts.reverse();
    return posts.map((post, index) => (
      <div key={index} className='post-display'>
        <h3>{post.name}</h3>
        <p>{post.content}</p>
        <p>{post.date}</p>
      </div>
    ));
  }

  render() {
    return (
      <div className='parent'>
        <PostForm />
        <div className='post-list'>{this.displayPosts(this.state.posts)}</div>
      </div>
    );
  }
}

export default HomePage;
