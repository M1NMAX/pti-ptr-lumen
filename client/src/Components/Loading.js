import React from 'react';
// import {Spinner} from 'react-bootstrap';
import gif from '../img/your.gif';

function Loading() {
    return (
        <div className="d-flex justify-content-center">
            <img src={gif} alt="Loading" ></img>
            {/* <Spinner animation="border" role="status" mw-100 >
                <span className="sr-only">Loading...</span>
            </Spinner> */}
        </div>
    )
}

export default Loading
