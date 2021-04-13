import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import SearchField from "react-search-field"

function Search() {
    const animals = [0,1,2,3]

    const getAnimalsContent = animals => {
        let content = [];
        for (let i = 0; i < animals.length; i++) {
          content.push();
        }
        return content;
      };

    return (
        <div className="header">
            <SearchField 
                placeholder="Search..."
                classNames="search-bar"
             />
            
            <Container>
                <div class="catg">
                     {getAnimalsContent(animals)}
                </div>
            </Container>
        </div>
    )
}

export default Search



