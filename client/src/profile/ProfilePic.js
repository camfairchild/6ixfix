import React from 'react';

import { getProfileByuserName, uploadProfilePic } from '../Helper';

export default class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            picture: `${process.env.PUBLIC_URL}/images/defaultprofpic.png`        
        }
    }

    componentDidMount() {
        getProfileByuserName(this.props.user?.userName).then((profile) => {
            this.setState({
                picture: profile?.picture || `${process.env.PUBLIC_URL}/images/defaultprofpic.png`
            })
        }).catch((err) => {
            console.log(err);
        })
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
        uploadProfilePic(file)
        .then((res) => {
            this.setState({
                picture: res
            })
        }).catch((err) => {
            console.log(err);
        })
        this.setState({selectedFile: null })
    } 

    handleProfSelect = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        console.log("s", file)
        const fileUrl = URL.createObjectURL(file);
        console.log(fileUrl)
        this.setState({ 
            picture: fileUrl,
            selectedFile: file
        })
    }

    render() {
        return (
            <div className="profilePic-container" >
                {this.props.editable ? <div className="profilePic-upload"><input id="file-input" type="file" name="file" className="input-profilePic" onChange={this.handleProfSelect} />
                <div className="profilePic-bg" onClick={this.handleProfBgClick}/></div> : null}
                
                <img src={this.state.picture} alt="profile" key={this.state.selectedFile} />
                { this.props.editable && this.state.selectedFile ?
                <input className="submit-profilePic" value="Change Profile Picture" type="submit" onClick={this.handleProfUpdate}/> : null}
            </div>
        )
    }
}