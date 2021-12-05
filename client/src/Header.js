import React from 'react';
import Logo from './Logo';
import NavButton from './NavButton';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useSessionStorage } from './useSessionStorage';

export default function Header() {
    const [user, setUser] = useSessionStorage('user', null);
    console.log("user", user);
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