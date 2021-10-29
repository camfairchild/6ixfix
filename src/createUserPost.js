import React from 'react';
import './post.css';

import PostHeader from './postHeader';
import UserPosts from './userPosts';
import UserVehicleInfo from './userVehicleInfo';
import UserServiceInfo from './userServiceInfo.js';
import UserPostSubmission from './userPostSubmission';

// User Post Component
class CreateUserPost extends React.Component {

  state = {
    // these are the fields of the post that a user must fill in
    profilePic: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleMileage: "",
    vehicleFuel: "",
    serviceNeeded: "",
    postHeadline: "",
    userPosts: [
      {
        title: "", //
        author: "", // username of the person which we get from log-in
        text: "", // refers to the contents of the service required
        profile: {
          picture: "", // this will just be the stock image 
          link: "", // not sure what to fill in for this
          name: "" // same as author
        }
      }
    ]
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  addPost = () => {
    const postList = this.state.userPosts

    const post = {
      title: this.state.postHeadline,
      author: "",
      text: this.state.serviceNeeded,
      profile: {
        picture: <img src="defaultprofpic.png" alt="My Awesome logo" className="postImage" />, // add a default profile picture for each post
        link: "",
        name: ""
      }
    }

    postList.push(post)

    this.setState({
      userPosts: postList
    })
  }

  removePost = (post) => {
    const filteredPosts = this.state.userPosts.filter((p) => {
      return p !== post // filter out all the posts that pass this test (i.e. only remove post that fails this test)
    })

    this.setState({
      userPosts: filteredPosts
    })
  }


  render() {
    return (

      <div className="userPost">

        <div className="postCreationBanner">
          <ul>

            {/* <div className="profilePicture"> */}

            <li>
              <PostHeader title="Profile Picture" />

              <input type="submit"
                className="submit"
                value="Update" />

              {/*Add a default profile picture here for now*/}
              {/*Will need to make a server call here to get user profile picture*/}

              <img src="defaultprofpic.png" alt="profile picture" />
            </li>

            {/* </div> */}

            <li>
              {/* <div className="vehicleInfo"> */}

              <PostHeader title="Vehicle Information"
                subtitle="Please fill in the following fields" />

              <UserVehicleInfo vehicleMake={this.state.vehicleMake}
                vehicleModel={this.state.vehicleModel}
                vehicleMileage={this.state.vehicleMileage}
                vehicleFuel={this.state.vehicleFuel}
                handleInputChange={this.handleInputChange} />

              {/* </div> */}
            </li>


            <li>
              {/* <div className="serviceNeeded"> */}

              <PostHeader title="Service Information"
                subtitle="Please enter the service(s) you require" />

              <UserServiceInfo serviceNeeded={this.state.serviceNeeded}
                handleInputChange={this.handleInputChange} />

              {/* </div> */}
            </li>

            <li>
              {/* <div className="postHeadline"> */}

              <PostHeader title="Post Summary"
                subtitle="Please include a headline for your post" />

              <UserPostSubmission postHeadline={this.state.postHeadline}
                handleInputChange={this.handleInputChange}
                addPost={this.addPost} />

              {/* </div> */}
            </li>

          </ul>
        </div>


        <div classname="previousPosts">

          <PostHeader title="Previous Posts" />

          <UserPosts userPosts={this.state.userPosts} // adds the users post to the screen (need to route this to its own page)
            removePost={this.removePost} />

        </div>

      </div>

    )
  }
}

export default CreateUserPost;
