import React from "react";
import './post.css';

class PostHeader extends React.Component {
    render() {
        const { title, subtitle } = this.props

        return (
            <div>
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
            </div>
        )
    }
}

export default PostHeader;