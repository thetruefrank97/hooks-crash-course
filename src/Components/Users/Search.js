import React,{useState} from "react";
import PropTypes from "prop-types";

const Search = (props) => {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         text:""
    //     }

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
            props.searchUsers(text);
            setText("");
        }
    }

        // const {showClear,clearUsers} = this.props;
        const clear = <button className="btn btn-light btn-block" onClick={props.clearUsers}>Clear</button>;
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
                {props.showClear ? clear : null }
            </div>
        );
}

Search.propTypes= {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}


export default Search;