import React,{useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

import{
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from "../types";


const GithubState = props => {
    const initialState = {
        users:[],
        user: {},
        loading: false,
        repos:[]
    }

    const [state,dispatch]=useReducer(GithubReducer,initialState);

    //Search Users
    const searchUsers = async (text) => {
        setLoading();

        const response = await axios
            .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


        dispatch({
            type: SEARCH_USERS,
            payload:response.data.items
        });
    }

    //Get User
    const  getUser = async (username) => {
        // setState({loading:true})
        setLoading();

        const response = await axios
            .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        // this.setState({user:response.data, loading:false})
       dispatch({
           type:GET_USER,
           payload:response.data
       });
    }

    //Get Repos

    //Clear Users
    const clearUsers = () => dispatch({type: CLEAR_USERS});


    //Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return <GithubContext.Provider
        value={{
            users:state.users,
            user: state.user,
            repos: state.repos,
            loading:state.loading,
            searchUsers,
            clearUsers,
            getUser
        }}
        >
        {props.children}
    </GithubContext.Provider>
}


export default GithubState;