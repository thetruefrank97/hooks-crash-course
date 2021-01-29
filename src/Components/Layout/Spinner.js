import React,{Fragment} from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
    return (
        <div>
            <Fragment>
                <img src={spinner} alt="Loading..." style={{spinnerStyles}}/>
            </Fragment>
        </div>
    );
}

const spinnerStyles = {
       width: "200px",
       margin: "auto",
        display: "block"
}


export default Spinner;