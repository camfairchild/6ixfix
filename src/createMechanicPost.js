import React from 'react';
import './post.css';

import PostHeader from './postHeader';
import MechanicPosts from './mechanicPosts';
import MechanicSkillsInfo from './mechanicSkillsInfo';
import MechanicCertificationsInfo from './mechanicCertificationsInfo';
import UserPostSubmission from './userPostSubmission';
import Header from './Header';

// User Post Component
class CreateMechanicPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // these are the fields of the post that a mechanic must fill in
      profilePic: "",
      certifications: "",
      skills: "",
      postHeadline: "",
      user: this.props.user,
      mechanicPosts: [
        {
          title: "", //
          author: this.props.user?.userName, // username of the person which we get from log-in
          text: "", // refers to the contents of the skills the mechanic has
          profile: {
            picture: "", // this will just be the stock image 
            link: "", // not sure what to fill in for this
            name: this.props.user?.fullName // same as author
          }
        }
      ]
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
    const postList = this.state.mechanicPosts

    const post = {
      title: this.state.postHeadline,
      author: "",
      text: this.state.skills,
      profile: {
        picture: <img src="/images/defaultprofpic.png" alt="My Awesome logo" className="postImage" />, // add a default profile picture for each post
        link: "",
        name: ""
      }
    }

    postList.push(post)

    this.setState({
      mechanicPosts: postList
    })
  }

  removePost = (post) => {
    const filteredPosts = this.state.mechanicPosts.filter((p) => {
      return p !== post // filter out all the posts that pass this test (i.e. only remove post that fails this test)
    })

    this.setState({
      mechanicPosts: filteredPosts
    })
  }


  render() {
    return (
      <div className="createMechanicPost-container">
        <Header page="post"/>
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

                <img src="/images/defaultprofpic.png" alt="profile picture" />
              </li>

              {/* </div> */}

              <li>
                {/* <div className="vehicleInfo"> */}

                <PostHeader title="Skills"
                  subtitle="Please enter the skill(s) you possess" />

                <MechanicSkillsInfo skills={this.state.skills}
                  handleInputChange={this.handleInputChange} />

                {/* </div> */}
              </li>


              <li>
                {/* <div className="serviceNeeded"> */}

                <PostHeader title="Certifications"
                  subtitle="Please enter the certification(s) you possess" />

                <MechanicCertificationsInfo certifications={this.state.certifications}
                  handleInputChange={this.handleInputChange} />

                {/* </div> */}
              </li>

              <li>
                {/* <div className="postHeadline"> */}

                <PostHeader title="Post Summary"
                  subtitle="Please include a headline for your post" />

                <UserPostSubmission postHeadline={this.state.postHeadline} // we can use the UserPostSubmission class since this doesnt depend on user type
                  handleInputChange={this.handleInputChange}
                  addPost={this.addPost} />

                {/* </div> */}
              </li>

            </ul>
          </div>


          <div className="previousPosts">

            <PostHeader title="Previous Posts" />

            <MechanicPosts mechanicPosts={this.state.mechanicPosts} // adds the mechanic post to the screen (need to route this to its own page)
              removePost={this.removePost} />

          </div>

        </div>
      </div>
    )
  }
}

export default CreateMechanicPost;
