import React, { useEffect, useState } from 'react';
import Header from './Header';

import { useLocation, useParams, useHistory } from 'react-router';

import './Profile.css'
import ProfilePic from './ProfilePic';
import { getUser, getProfileByuserName } from './Helper';
import UserVehicleInfo from './userVehicleInfo';
import UserInfoEdit from './UserInfoEdit';

export default function Profile(props) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isUser, setisUser] = useState(false);
    const [editVehicleInfo, setEditVehicleInfo] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [editUserInfo, setEditUserInfo] = useState(false);

    const params = useParams();
    const userName = params['userName'] || null;

    const history = useHistory();

    useEffect(() => {
        getUser().then((user) => {
            getProfileByuserName(userName).then((profile) => {
                setUser(user)
                setLoggedIn(user !== null)
                setProfile(profile)
                setisUser(user?.userName === profile.userName)
            })
        })
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

    const callUpdateProfile = (newProfile) => {
        // make api call to update profile
    }

    const addToGallery = () => {
        if (!newImage) {
            return 
        }
        setProfile({
            ...profile,
            carPics: [...profile.carPics, {
                picture: newImage
            }]
        })
        callUpdateProfile(profile)
        setNewImage(null)
    }

    const addImageChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const fileURL = URL.createObjectURL(file);
        setNewImage(fileURL)
    }

    const EditUserInfo = (e) => {
        e.preventDefault()
        setEditUserInfo(true)
    }

    const handleEditUserInfo = (newInfo) => {
        setProfile({
            ...profile,
            ...newInfo
        })
        setEditUserInfo(false)
        callUpdateProfile(profile)
    }


    return ( // In the future, onlick of 'message me' will refer to chat with parameter of this user if logged in, or signup page if not

        <div className="profilePage">
            <Header page="profile" />

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
                                        <img src={image.picture} alt="gallery image" />
                                        <div className="profile-gallery-caption">{image.caption}</div>
                                    </div>)
                            })}
                        </div>
                    </div>
            </div>
        </div>
    );

}