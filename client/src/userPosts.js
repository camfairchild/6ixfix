import React from "react";
import './post.css';
import { uid } from 'react-uid';
import UserPost from "./userPost";

class UserPosts extends React.Component {

    render() {

        const { userPosts, removePost, profile } = this.props

        return (
            <div className="userPosts">
                {userPosts.map((post) => {
                    return (
                        <UserPost key={uid(post)}
                            post={post}
                            removePost={removePost} profile={profile} />
                    )
                })}
            </div>
        )
    }

}

export default UserPosts;