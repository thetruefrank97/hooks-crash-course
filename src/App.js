import './App.css';
import React,{Fragment,Component} from "react"
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import UserItem from "./Components/Users/UserItem";

class App extends Component {
    // fah = () => {
    //     return "Bars"
    // }
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
            <div className="App">
                <Navbar title="Github Finder" icon="fab fa-github"/>
                <div className="container">
                    <Users/>
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
        );
    }
}

export default App;
