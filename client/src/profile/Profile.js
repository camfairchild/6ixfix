import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Error from '../Error';

import { useLocation, useParams, useHistory } from 'react-router';

import './Profile.css'
import ProfilePic from './ProfilePic';
import { getProfileByuserName, updateProfile, uploadImage, useQuery } from '../Helper';
import UserVehicleInfo from './userVehicleInfo';
import UserInfoEdit from './UserInfoEdit';

import { useSessionStorage } from '../useSessionStorage'

export default function Profile(props) {
    const [user, setUser] = useSessionStorage('user', null);
    const [profile, setProfile] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isUser, setisUser] = useState(false);
    const [editVehicleInfo, setEditVehicleInfo] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [editUserInfo, setEditUserInfo] = useState(false);
    const params = useParams();
    const [userName, setUserName] = useState(params['userName'] || null);


    const query = useQuery()
    const err_ = query.get('e')

    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            try {
                if (!userName && user) {
                        setUserName(user.userName)
                }
                let profile;
                try {
                    profile = await getProfileByuserName(userName)
                } catch (error) {
                    return console.log(error)
                }
                setLoggedIn(user !== null)
                setProfile(profile)
                setisUser(user?.userName === profile.userName || user.userType === 'Admin')
                console.log(loggedIn)
                console.log(user)
            } catch (err) {
                if (err.code === 404) {
                    return history.push(`/profile/${userName || ""}?e=404`)
                } else {
                    return history.push(`/profile/${userName || ""}?e=500`, {error: err})
                }
            }
        }

        if (!err_) {
            // no error
            fetchData()
        }  
    }, [])

    const GoToMessages = () => {
        history.push(`/messages/`)
    }

    const EditVehicleInfo = () => {
        setEditVehicleInfo(true)
    }

    const changeVehicleInfo = (newInfo) => {
        setProfile({
            ...profile,
            ...newInfo
        })
        setEditVehicleInfo(false)
        callUpdateProfile(profile)
    }

    const callUpdateProfile = async (newProfile, user) => {
        // make api call to update profile
        try {
            updateProfile(newProfile, user)
        } catch(error) {
            console.log(error)
        }
    }

    const addToGallery = async () => {
        if (!newImage) {
            return 
        }
        const result = await uploadImage(newImage)
        setProfile(result.client)
        setNewImage(null)
    }

    const addImageChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        setNewImage(file)
    }

    const EditUserInfo = (e) => {
        e.preventDefault()
        setEditUserInfo(true)
    }

    const handleEditUserInfo = (newInfo) => {
        const newProfile = {
            ...profile,
            ...newInfo
        }
        setProfile(newProfile)
        setEditUserInfo(false)
        console.log(newProfile)
        callUpdateProfile(newProfile, user)
    }


    return ( // In the future, onlick of 'message me' will refer to chat with parameter of this user if logged in, or signup page if not

        <div className="profilePage">
            <Header page="profile" />
            { err_ ? <Error code={err_} origin="profile" error={history.location.state?.error}/> :
            <div className="profile-container">
                <div className="profile-views">Profile Views: {profile?.numViews || 0}</div>
                <div className="profile-banner">
                    <img src={profile?.bannerImage || `${process.env.PUBLIC_URL}/images/defaultbanner.jpg`} alt="banner" />
                </div>
                <div className="profile-user-details">
                    <ProfilePic user={profile} editable={isUser} key={profile} />
                    <div className="profile-location">
                        {profile?.location}
                    </div>
                    <div className="profile-userName">
                        {profile?.userName}
                    </div>
                    <div className="profile-fullName">
                        {profile?.fullName}
                    </div>
                    {profile?.serviceRequested ?
                        <div className="profile-service">
                            Hi! I need help with a(n): {profile?.serviceRequested}
                        </div> : null}

                        {profile?.rate ?
                        <div className="profile-service">
                           My rate is: {profile?.rate}
                        </div> : null}

                        {profile?.type === 'Mechanic' ? <div className="profile-mechType">
                <div className="usertypetag tagmechanic">{profile?.mechType}</div>
                </div> : null }
                    <div className="profile-bio">
                        {profile?.bio}
                    </div>

                    {isUser ? null :
                        <button onClick={GoToMessages} className="profile-message">{loggedIn ? 'Message Me' : 'Log in to message users'}</button>
                    }
                <UserInfoEdit handleSubmit={handleEditUserInfo} editable={editUserInfo} profile={profile} key={"edit" + profile} />
                {isUser && !editUserInfo ? <button className="vehicle-edit" onClick={EditUserInfo}>Change</button> : null}
                </div>
                {profile?.type === 'Client' ? <div className="profile-vehicle-container">
                    <UserVehicleInfo profile={profile} editable={editVehicleInfo} handleSubmit={changeVehicleInfo} />
                    {isUser && !editVehicleInfo ? <button className="vehicle-edit" onClick={EditVehicleInfo}>Change</button> : null}
                </div> : null }

                

                    <div className="profile-gallery" >
                        <div className="profile-gallery-title">
                            Gallery
                        </div>
                        
                        <div className="gallery-add">
                            <div className="gallery-add-title"> Add a picture </div>
                            <input onChange={(e) => addImageChange(e)} id="file-input" type="file" name="file" className="profile-gallery-add"/>
                            <input onClick={addToGallery} id="add-image" type="submit" className="profile-gallery-add-button" value="Add Image" />
                        </div>
                        <div className="profile-gallery-images" key={profile}>
                            {profile?.carPics?.map((image, index) => {
                                return (
                                    <div className="profile-gallery-item" key={index}>
                                        <img src={image.url} alt="gallery" />
                                        <div className="profile-gallery-caption">{image.caption}</div>
                                    </div>)
                            })}
                        </div>
                    </div>
            </div> }
        </div>
    );

}