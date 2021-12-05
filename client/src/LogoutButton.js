import React from 'react';
import NavButton from './NavButton';
import { logout } from './Helper'

export default function LoginButton() {
    logout()

    return (
        <NavButton href="/logout">LOGOUT</NavButton>
    )
}