import React from "react";
import './post.css';
import { uid } from 'react-uid';
import UserPost from "./userPost";

class UserPosts extends React.Component {

    render() {

        const { userPosts, removePost } = this.props

        return (
            <div className="container">
                <ul>
                    {userPosts.map((post) => {
                        return (
                            <UserPost key={uid(post)}
                                post={post}
                                removePost={removePost} />
                        )
                    })}
                </ul>
            </div>
        )
    }

}

export default UserPosts;