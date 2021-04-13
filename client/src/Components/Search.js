import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import SearchField from "react-search-field"

function Search() {
    

    return (
        <div className="header"  id = "down">
            <SearchField 
                placeholder="Search..."
                classNames="search-bar"
             />
            
            
        </div>
    )
}

export default Search



