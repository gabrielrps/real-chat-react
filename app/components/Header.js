import React, { useContext } from 'react';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderLoggedIn from './HeaderLoggedIn';
import StateContext from '../StateContext';

function Header(props) {

    const appContext = useContext(StateContext);

    return (
        <header className="header-bar bg-primary mb-3">
            <div className="container d-flex flex-column flex-md-row align-items-center p-3">
                {appContext.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut /> }
            </div>
        </header>
    );
}

export default Header;