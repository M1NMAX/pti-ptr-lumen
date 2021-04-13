import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Card} from 'react-bootstrap'
import scroll from '../../img/scroll.png'
import capa from '../../img/capa.png'
import NavBarHome from '../../Components/NavBarHome'
import '../../App.css'
function Homepage() {
    return (
        <div className="App img" style={{
            height:"100%"
          }}>
            <NavBarHome/>
            <Container fluid>
                <h1 className="slogan">Your sweet home away from home</h1>
                <div className="buttonImg">
                    <img src={scroll} className="buttonImg2"/> 
                    <a className="buttonImgLink" href='#down'>Ver mais</a>
                </div>
             </Container>
        </div>

    )
}

export default Homepage
