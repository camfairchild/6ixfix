import React from "react";
import './post.css';

class MechanicPost extends React.Component {

    render() {

        const { post, removePost, profile} = this.props

        return (
            <div className="post">
                <li>
                    <div className="post-title">
                        Title: {post.title}
                    </div>
                    <div className="post-meta">
                        <div className="post-services">Service(s) Needed:{post.text}</div>
                        <div className="post-profilePic"><img src={profile.picture} /></div>
                        <div className="post-link">{profile.link}</div>
                        <div className="post-author">{profile.userName}</div>
                    </div>
                    
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