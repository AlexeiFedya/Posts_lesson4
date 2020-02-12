import React from 'react';
import { findUser } from './findUser'
import { AddPostId } from './AddPostId'
import './App.css';

export class AddPosts extends React.Component {
  state = {
    activePostId: null,
    activePostUser: null
  }
      render() {
        if (this.state.activePostId){
          return (
            <React.Fragment> 
              <button
                className="back"
                onClick={() => this.setState({ 
                  activePostId: null,
                  activePostUser: null
                })}
              >
                Show all posts
              </button>
              <AddPostId 
                postId={this.state.activePostId}
                postUser={this.state.activePostUser}
                users={this.props.users}
              />
            </React.Fragment> 
          );
        } else {
          return (
            <React.Fragment>          
                {this.props.posts.map(post => (
                  <div
                    id={post.id}
                    key={post.id}
                    className="post-preview"
                    onClick={() => this.setState({ 
                      activePostId: post.id,
                      activePostUser: findUser(this.props.users, post.userId)
                    })}
                  >
                    <h6>{findUser(this.props.users, post.userId)}</h6>
                    <h4>{post.title}</h4>
                  </div>
                ))} 
            </React.Fragment>
          );
        }
      }
}
  