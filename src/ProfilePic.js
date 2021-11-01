import React from 'react';

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            user: this.props.user,        
        }
    }

    handleProfBgClick = (e) => {
        e.preventDefault()
        document.getElementById('file-input').click()
    }

    handleProfUpdate = (e) => {
        e.preventDefault()
        const file = this.state.selectedFile;
        this.changeProfilePic(file);
    }

    changeProfilePic = (file) => {
    // PUT request to update profile picture
    } 

    handleProfSelect = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        this.setState({
            selectedFile: file
        })
        console.log(file)
        const fileUrl = URL.createObjectURL(file);
        console.log(fileUrl)
        let user = {...this.state.user}
        user.picture = fileUrl;
        this.setState({ 
            user
        })
    }

    render() {
        return (
            <div className="profilePic-container">
                {this.props.editable ? <div><input id="file-input" type="file" name="file" className="input-profilePic" onChange={this.handleProfSelect} />
                <div className="profilePic-bg" onClick={this.handleProfBgClick}/></div>: null}
                <img src={this.state.user.picture} alt="profile" />
            </div>
        )
    }
}