import React from "react";
import './post.css';

class UserPostSubmission extends React.Component {

    render() {

        const { postHeadline, handleInputChange, addPost } = this.props

        return (
            <div>
                <input value={postHeadline}
                    onChange={handleInputChange}
                    type="text"
                    name="postHeadline"
                    className="textInput"
                    placeholder="Enter post headline" />

                <input type="submit"
                    className="submit"
                    onClick={addPost} // this is the button that adds the entire post (the format of the post is still in App.js)
                    value="Add Post" />
            </div>
        )
    }

}

export default UserPostSubmission;