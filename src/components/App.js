import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then( res => {
      console.log(res)
      let posts = res.data
      this.setState({
        posts: posts
      })
    })
    .catch(err => {
      console.log("there was an error in component did mount", err)
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
  
  }

  deletePost( id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {
      this.setState({ posts: results.data });
    });
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
      this.setState({ posts: results.data });
    });  
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}
/>
          {posts.map(post => (
          <Post 
          text={post.text} 
          id={post.id} 
          date={post.date} 
          key={post.id}
          updatePostFn={this.updatePost}
          deletePostFn={this.deletePost}
          />))}
        </section>
      </div>
    );
  }
}

export default App;
