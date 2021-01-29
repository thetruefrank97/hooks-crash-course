import './App.css';
import React,{Component,Fragment} from "react"
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import axios from "axios";
import Search from "./Components/Users/Search";
import Alert from "./Components/Layout/Alert";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import About from "./Components/Page/About";
import User from "./Components/Users/User";


class App extends Component {
    // fah = () => {
    //     return "Bars"
    // }
    constructor(props){
        super(props);
        this.state= {
            users: [],
            user: {},
            loading:false,
            alert: null
        }
    }


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
    searchUsers = async (text) => {
        this.setState({loading:true})

        const response = await axios
            .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({users:response.data.items, loading:false})
        console.log(this.state.users)
    }

    // Get single Github user
    getUser = async (username) => {
        this.setState({loading:true})

        const response = await axios
            .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        this.setState({user:response.data, loading:false})
        console.log(this.state.user)

    }

    //Clear users from state
    clearUsers = () => {
        this.setState({users:[], loading:false})
        console.log(this.setState.users)
    }

    //Set Alert
    setAlert=(msg,type) => {
        this.setState({alert:{msg,type}});

        setTimeout(() => this.setState({alert: null}),5000);
    }

    render(){
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
                    <Alert alert={this.state.alert}/>
                    <Switch>
                        <Route  exact path="/"
                                render={props => (
                            <Fragment>
                                <Search
                                    searchUsers={this.searchUsers}
                                    clearUsers={this.clearUsers}
                                    showClear={this.state.users.length > 0 ? true : false}
                                    setAlert={this.setAlert}
                                />
                                <Users
                                    loading={this.state.loading}
                                    users={this.state.users}
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
                                getUser={this.getUser}
                                user={this.state.user}
                                loading={this.state.loading}
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
}

export default App;
