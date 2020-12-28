import React, { useState, useContext } from "react";
import Axios from 'axios';
import DispatchContext from '../DispatchContext';


function HeaderLoggedOut() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const appDispatch = useContext(DispatchContext);

    async function handleSubmit(e){
        e.preventDefault();

        try {
            const response = await Axios.post("/api/login", {username, password});
            if(response.data.username == ""){
                appDispatch({type: "flashMessage", value: "Usuário não encontrado na base"});
            }else {
                appDispatch( { type:"login", data: response.data } );
            }
        } catch (err) {
            console.log(err.response.data);
        }


    }


    return (
        <form className="mb-0 pt-2 pt-md-0" onSubmit={handleSubmit} >
            <div className="row align-items-center">
                <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                    <input name="username" onChange={e => setUsername(e.target.value)} className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
                </div>
                <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                    <input name="password" onChange={e => setPassword(e.target.value)} className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
                </div>
                <div className="col-md-auto">
                    <button className="btn btn-success btn-sm">Sign In</button>
                </div>
            </div>
        </form>
    )
}

export default HeaderLoggedOut