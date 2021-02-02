import React,{useState,useContext} from "react";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";


const Search = (props) => {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         text:""
    //     }

    const githubContext=useContext(GithubContext);
  const [text,setText]=useState("");


    const onChange = (event) =>{
        setText(event.target.value)
    };

    // onSubmit(event) {
    //     event.preventDefault();
    //     console.log(this.state.text);
    // }

    const onSubmit = (event) => {
        event.preventDefault();
        if(text === ""){
            props.setAlert("Please enter something", "light");
        }else{
            githubContext.searchUsers(text);
            setText("");
        }
    }

        // const {showClear,clearUsers} = this.props;
        const clear = <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>;
        return(
            <div>
                <form onSubmit={/*this.onSubmit.bind(this)*/ onSubmit} className="form">
                    <input
                        type="text"
                        name="text"
                        placeholder="Search Users..."
                        value={text}
                        onChange={onChange}
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-dark btn-block"
                    />
                </form>
                {githubContext.users.length > 0 ? clear : null }
            </div>
        );
}

Search.propTypes= {
    setAlert: PropTypes.func.isRequired
}


export default Search;