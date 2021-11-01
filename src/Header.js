import React from 'react';
import Logo from './Logo';
import NavButton from './NavButton';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton'

import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
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
                    <LoginButton />
                </li>
            </ul>
        </div>
        )
    }
}