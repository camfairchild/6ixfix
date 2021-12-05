import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import NavButton from './NavButton';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { getUser } from './Helper'

export default function Header() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // get user on load
        getUser().then(user => {
            setUser(user)
        })
    }, [])

    return (
    <div className="header">
        <ul>
            <li>
                <Logo href="/" src="/images/6ixfix_logo_black.png"/>
            </li>
            <li>
                <NavButton href="/about">ABOUT</NavButton>
            </li>
            <li>
                <NavButton href="/help">HELP</NavButton>
            </li>
            <li>
                <SearchBar />
            </li>
            <li>
                <NavButton href="/search">BROWSE</NavButton>
            </li>
            <li>
                <NavButton href="/messages">MESSAGES</NavButton>
            </li>
            <li>
                { user ? <LogoutButton /> : <LoginButton /> }
            </li>
        </ul>
    </div>
    )
}