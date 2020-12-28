import React, { useEffect, useContext } from "react";
import DispatchContext from '../DispatchContext';
import Axios from 'axios';
import StateContext from '../StateContext';

function HeaderLoggedIn() {

    const appContext = useContext(StateContext);

    const appDispatch = useContext(DispatchContext);

    async function handleLogout(){
        try {
            const response = await Axios.delete(`/api/deleteOnline/${appContext.user.username}`);
        } catch (err) {
            console.log(err.response.data);
        }
        appDispatch( { type:"logout" } );
    }

    function handleChat(e){
        appDispatch({type:"toggleChat"});
        appDispatch({type:"chatTopic", value: "global", from: appContext.from, to:"global"});
    }

    return (
 
        <div className="flex-row my-3 my-md-0">
            <span onClick={handleChat} data-for="chat" data-tip="Chat" className="mr-2 header-chat-icon text-white">
                <i className="fas fa-comment"></i>
                <span className="chat-count-badge text-white"> </span>
            </span>
            <button onClick={handleLogout} className="btn btn-sm btn-secondary" >
                Sign Out
            </button>
        </div>
    )
}

export default HeaderLoggedIn;