import React from 'react';
import { makeRequest } from './makeRequest'
import { AddPosts } from './AddPosts'

export class PostsContainer extends React.Component {
    state = {
      posts: null,
      users:null,
      isLoading: true,
      isError: false
    };
  
    async componentDidMount() {
      try {
        const posts = await makeRequest(
          "https://jsonplaceholder.typicode.com/posts"
        );
  
        const users = await makeRequest(
          "https://jsonplaceholder.typicode.com/users"
        );
  
        this.setState({
          isLoading: false,
          posts,
          users
        });
      } catch (e) {
        this.setState({
          isLoading: false,
          isError: true
        });
      }
    }
  
    render() {
      if (this.state.isError) {
        return "Unexpected error";
      }
  
      if (this.state.isLoading) {
        return "...Loading...";
      }
  
      return <AddPosts posts={this.state.posts} users={this.state.users} />;
    }
  }