import './App.css';
import React,{useState,Fragment} from "react"
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import axios from "axios";
import Search from "./Components/Users/Search";
import Alert from "./Components/Layout/Alert";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import About from "./Components/Page/About";
import User from "./Components/Users/User";


const App = () => {
    // fah = () => {
    //     return "Bars"
    // }
    const[users,setUsers]=useState([]);
    const[user,setUser]=useState({});
    const[loading,setLoading]=useState(false);
    const[alert,setAlert]=useState(null);
    const[repos,setRepos]=useState([]);





    //get all users
   // async componentDidMount() {
   //
   //      this.setState({loading: true});
   //
   //     const response = await axios
   //          .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
   //          client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
   //
   //     this.setState({users:response.data, loading:false})
   //  }

    //Search github users
    const searchUsers = async (text) => {
        setLoading(true);

        const response = await axios
            .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        // this.setState({users:response.data.items, loading:false})
        setUsers(response.data.items);
        setLoading(false);
        console.log(users)
    }

    // Get single Github user
   const  getUser = async (username) => {
        // setState({loading:true})
       setLoading(true);

        const response = await axios
            .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        // this.setState({user:response.data, loading:false})
       setUser(response.data);
       setLoading(false);
        console.log(user)
    }

    //Get users repos
    const getUserRepos = async(username) => {
        // this.setState({loading:true});
        setLoading(true);

        const response= await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        // this.setState({repos:response.data, loading:false});
        setRepos(response.data);
        setLoading(false);
    }

    //Clear users from state
    const clearUsers = () => {
        // this.setState({users:[], loading:false})
        setUsers([]);
        setLoading(false);
        console.log(users)
    }

    //Set Alert
    const showAlert =(msg,type) => {
        // this.setState({alert:{msg,type}});
        setAlert({msg,type});

        setTimeout(() => setAlert(null),5000);
    }


        // const name="John Doe";
        // const loading = false;
        // const foo = () => "Bar";
        // const showName=true;

        // if(loading){
        //     return <h4>Loading...</h4>
        // }

        // const numbers = [1,2,3,4]

        return (
            <Router>
            <div className="App">
                <Navbar title="Github Finder" icon="fab fa-github"/>
                <div className="container">
                    <Alert alert={alert}/>
                    <Switch>
                        <Route  exact path="/"
                                render={props => (
                            <Fragment>
                                <Search
                                    searchUsers={searchUsers}
                                    clearUsers={clearUsers}
                                    showClear={users.length > 0 ? true : false}
                                    setAlert={showAlert}
                                />
                                <Users
                                    loading={loading}
                                    users={users}
                                />
                            </Fragment>
                        )}
                        />
                        <Route exact path="/about"
                               component={About}
                        />
                        <Route exact path="/user/:login" render={props => (
                            <User
                                {...props}
                                getUser={getUser}
                                user={user}
                                loading={loading}
                                getUserRepos={getUserRepos}
                                repos={repos}
                            />
                        )}
                        />
                    </Switch>
                </div>
                {/*{loading ? (*/}
                {/*    <h4>Loading...</h4>*/}
                {/*    ) : (*/}
                {/*        <h1>Hello {showName ? name : null}</h1>*/}
                {/*)}*/}
                {/*/!*<h1 htmlFor="name">Hello {name}</h1>*!/*/}
                {/*<h2> Hello {foo()}</h2>*/}
                {/*<h3>Hello {this.fah()}</h3>*/}
            </div>
            </Router>
        );
}

export default App;
