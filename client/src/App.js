import React from 'react'; 
import axios from 'axios'; 
import './App.css';

class App extends React.Component {

  state = {
    name: '',
    content: '',
    posts: [] 
  }

  componentDidMount = () => {
    this.getBlogPost(); 
  };

  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data; 
        this.setState({posts: data});
        console.log('Data has been received');
      })
      .catch(() => {
        alert('Error retrieving data');  // change to actually handle error
      });
  };

  handleChange = ({target}) => {
    const {name, value} = target; 
    this.setState({[name]: value});
  };

  submit = (event) => {
    event.preventDefault(); 
    const payload = {
      name: this.state.name,
      content: this.state.content
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
      })
      .catch(() => {
        console.log('Internal server error'); 
      });
  };

  resetUserInputs = () => {
    this.setState({
      name: '',
      content: ''
    });
  };

  displaySqueakPosts = (posts) => {
    if (!posts.length) return null; 
    return posts.map((post, index) => (
      <div key={index}>
        <h3>{post.name}</h3>
        <p>{post.content}</p>
      </div>
    ));
  };

  render() {
    return (
      <div className="App">
        <h2>RatPack</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input 
              type="text" 
              name="name" 
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea 
              name="content" 
              cols="30" 
              rows="10" 
              value={this.state.content}
              onChange={this.handleChange}
              >
              </textarea>
          </div>
          <button>Submit</button>
        </form>
        <div className="squeakPosts">
          {this.displaySqueakPosts(this.state.posts)}
        </div> 
      </div>
    );
  }
}
export default App;
