import React, { useEffect, useContext } from "react";
import StateContext from '../StateContext';
import {useImmer} from 'use-immer';
import Axios from 'axios';
import Page from './Page';
import User from './User';


function Home() {
    const appContext = useContext(StateContext);

    const [state, setState] = useImmer({
        users: []
    });

    useEffect(() => {
        async function fetchData(){
            try {
                const response = await Axios.get(`/api/getUsersConnect/${appContext.user.username}`);
                setState(draft => {
                    draft.users = response.data;
                });

            } catch (err) {
                console.log(err.response);
            }
        }
        fetchData();    
    },[]);


    return (
        <Page title="Home">
            {state.users.length > 0 &&
                <>
                    <h2 className="text-center mb-4">Usuários Online</h2>
                    <div className="list-group">
                        {state.users.map((user,index) => {
                           return <User user={user} key={index} />
                        })}
                    </div>
                </>
            }
            {state.users.length == 0 && (
                <>
                    <h2 className="text-center">Hello <strong>{appContext.user.username}</strong>, não tem ninguem online para conversar =/.</h2>
                </>
            )}

        </Page>
    )
}

export default Home;