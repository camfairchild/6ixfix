import React from 'react';
import './post.css';

import PostHeader from './postHeader';
import UserPosts from './userPosts';
import UserVehicleInfo from './userVehicleInfo';
import UserServiceInfo from './userServiceInfo.js';
import UserPostSubmission from './userPostSubmission';
import Header from './Header';
import ProfilePic from './ProfilePic';
// User Post Component
class CreateUserPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // these are the fields of the post that a user must fill in
      selectedFile: null,
      vehicleMake: "",
      vehicleModel: "",
      vehicleMileage: "",
      vehicleFuel: "",
      serviceNeeded: "",
      postHeadline: "",
      user: this.props.user,
      userPosts: [
        {
          title: "", //
          author: this.props.user?.userName, // username of the person which we get from log-in
          text: "", // refers to the contents of the service required
          date: "", // date of the post
        },
        {
          title: "", //
          author: this.props.user?.userName, // username of the person which we get from log-in
          text: "", // refers to the contents of the service required
          date: "", // date of the post
        }
      ],
      userProfile: {
        picture: "/images/defaultprofpic.png",
        userName: "",
        fullName: "",
        email: "",
        link: ""
      }
    }
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
      author: this.props.user?.userName,
      text: this.state.serviceNeeded
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
      <div className="createUserPost-container">
        <Header page="post"/>
        <div className="userPost">

          <div className="postCreationBanner">
            <ul>

              {/* <div className="profilePicture"> */}

              <li>
                <PostHeader title="Profile Picture" />
                <ProfilePic user={this.state.userProfile} />
                <input type="submit"
                  className="update-post"
                  value="Update"
                  onClick={this.handleProfUpdate} />

                {/*Add a default profile picture here for now*/}
                {/*Will need to make a server call here to get user profile picture*/}

                
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


          <div className="previousPosts">

            <PostHeader title="Previous Posts" className="previous-posts" />

            <UserPosts userPosts={this.state.userPosts} // adds the users post to the screen (need to route this to its own page)
              removePost={this.removePost} profile={this.state.userProfile} />

          </div>

        </div>
      </div>
    )
  }
}

export default CreateUserPost;
