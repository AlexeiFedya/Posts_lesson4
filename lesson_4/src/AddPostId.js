import React from 'react';
import { makeRequest } from './makeRequest';
import './App.css';

const Comments = ({ comments }) => (
    <div className="comments-container">
    <h2>Comments</h2>
    {comments.map(comment => (
        <div key={comment.id} className="comment-block">
          <h3>{comment.email}</h3>
          <p>{comment.name}</p>
        </div>
    ))}
    </div>
  );
  
  export class AddPostId extends React.Component {
    state = {
      post: null,
      comments: null,
      isLoading: true,
      isError: false
    };
  
    async getPost() {
      this.setState({
        isLoading: true,
        isError: false,
        posts: null,
        comments: null
      });
  
      try {
        const post = await makeRequest(
          `https://jsonplaceholder.typicode.com/posts?id=${this.props.postId}`
        );
        const comments = await makeRequest(
          `https://jsonplaceholder.typicode.com/comments?postId=${this.props.postId}`
        );
  
        console.log(comments);
  
        this.setState({
          isLoading: false,
          post,
          comments
        });
      } catch (e) {
        this.setState({
          isLoading: false,
          isError: true
        });
      }
    }
  
    componentDidMount() {
      this.getPost();
    }
  
    // componentDidUpdate(prevProps, prevState) { // если выйдет так что поменяется id юзера то заюзает getPost для обновления id 
    //   if (this.props.postId !== prevProps.postId) { 
    //     this.getPost();
    //   }
    // }
  
    render() {
      if (this.state.isError) {
        return "Unexpected error";
      }
  
      if (this.state.isLoading) {
        return "...Loading...";
      }
  console.log(this.state.post);
      return (
        <React.Fragment>
          <div className="post-page"> 
            <h1>{this.state.post[0].title}</h1>
            <div>{this.state.post[0].body}</div>
            <div className="author">{this.props.postUser}</div>
          </div> 
          <Comments comments={this.state.comments} />
        </React.Fragment>
      );
    }
  
    
  }