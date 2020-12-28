import React, { useContext } from "react";
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

function User(props) {
    const user = props.user;

    const appContext = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    function handleChat(e){
        appDispatch({type:"toggleChat"});
        
        if(user.username == "Global"){
            appDispatch({type:"chatTopic", value: "global", from:appContext.user.username, to: "global"});
        }else{
            var list = [];
            list.push(appContext.user.username);
            list.push(user.username);
            list.sort();

            appDispatch({type:"chatTopic", value: list[0]+list[1], from:appContext.user.username, to:user.username});
        }
        
    }

    return (
        <a href="#" onClick={handleChat} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src="asd" /> <strong>{user.username}</strong> {" "}
        </a>
    )
}

export default User;