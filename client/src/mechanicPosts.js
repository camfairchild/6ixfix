import React from "react";
import './post.css';
import { uid } from 'react-uid';
import MechanicPost from "./mechanicPost";

class MechanicPosts extends React.Component {

    render() {

        const { mechanicPosts, removePost } = this.props

        return (
            <div className="container">
                <ul>
                    {mechanicPosts.map((post) => {
                        return (
                            <MechanicPost key={uid(post)}
                                post={post}
                                removePost={removePost} />
                        )
                    })}
                </ul>
            </div>
        )
    }

}

export default MechanicPosts;