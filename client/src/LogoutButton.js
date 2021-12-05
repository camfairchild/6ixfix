import React from 'react';
import { logout } from './Helper';
import NavButton from './NavButton';
import { useSessionStorage } from './useSessionStorage';
import { useHistory } from 'react-router-dom';

export default function LoginButton() {
    const [user, setUser] = useSessionStorage('user', null);
    const history = useHistory();

    const logout_ = () => {
        setUser(null);
        logout().then(() => {
            history.push('/login');
        });
    }   

    return (
        <NavButton onClick={logout_} >LOGOUT</NavButton>
    )
}