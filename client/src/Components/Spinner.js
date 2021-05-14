import React from 'react';
import {Spinner} from 'react-bootstrap';

function Loading() {
    return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" mw-100 >
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading
