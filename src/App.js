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
import GithubState from "./context/github/githubState";


const App = () => {
    // fah = () => {
    //     return "Bars"
    // }


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


    // Get single Github user


    //Get users repos
    const getUserRepos = async(username) => {
        // this.setState({loading:true});
        setLoading(true);

        const response= await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        // this.setState({repos:response.data, loading:false});
        console.log(response.data);
        setRepos(response.data);
        setLoading(false);
    }

    //Clear users from state

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
            <GithubState>
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
                                    setAlert={showAlert}
                                />
                                <Users/>
                            </Fragment>
                        )}
                        />
                        <Route exact path="/about"
                               component={About}
                        />
                        <Route exact path="/user/:login" render={props => (
                            <User
                                {...props}
                                getUserRepos={getUserRepos}
                                repos={repos}
                            />
                        )}
                        />
                    </Switch>
                </div>
            </div>
            </Router>
            </GithubState>
        );
}

export default App;
