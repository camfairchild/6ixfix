import React from "react";
import './post.css';

class MechanicPost extends React.Component {

    render() {

        const { post, removePost } = this.props

        return (
            <div className="post">
                <li>
                    <h3>Title: {post.title}</h3>
                    <h3>Author: {post.author}</h3>
                    <h3>Service(s) Needed:{post.text}</h3>
                    <h3>{post.profile.picture}</h3>
                    <h3>{post.profile.link}</h3>
                    <h3>Name: {post.profile.name}</h3>
                    <input type="submit"
                        className="submit"
                        onClick={() => removePost(post)}
                        value="Remove Post" />
                </li>
            </div>
        )
    }

}

export default MechanicPost;