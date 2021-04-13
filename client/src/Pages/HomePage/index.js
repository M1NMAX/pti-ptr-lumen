import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Card,Row,Col} from 'react-bootstrap'
import scroll from '../../img/scroll.png'
import capa from '../../img/capa.png'
import NavBarHome from '../../Components/NavBarHome'
import Search from '../../Components/Search'
import './index.css'
import alojamento from '../../img/basicRoom.png'
import { AnimationWrapper } from 'react-hover-animation'
function Homepage() {
    const n = 8; // Or something else
    const content = [...Array(n)].map((e, i) => 
    <Row>
        <Col>
            <Card className="mb-4 mt-4 ml-4 mr-4 center">
                <AnimationWrapper>
                    <a href="/profileAlojamento">
                        <Card.Img onclick="href='/profileAlojamento" className="img" src={alojamento}></Card.Img>
                    </a>
                </AnimationWrapper>
                <Card.Title className="center">alojamento</Card.Title>
            </Card> 
        </Col>
        <Col>
           <Card className="mb-4 mt-4 ml-4 mr-4 center">
                <AnimationWrapper>
                    <a href="/profileAlojamento">
                        <Card.Img onclick="href='/profileAlojamento" className="img" src={alojamento}></Card.Img>
                    </a>
                </AnimationWrapper>
               <Card.Title className="center">alojamento</Card.Title>
            </Card> 
        </Col>
        <Col>
           <Card className="mb-4 mt-4 ml-4 mr-4 center">
                <AnimationWrapper>
                    <a href="/profileAlojamento">
                        <Card.Img onclick="href='/profileAlojamento" className="img" src={alojamento}></Card.Img>
                    </a>
                </AnimationWrapper>
               <Card.Title className="center">alojamento</Card.Title>
            </Card> 
        </Col>


    </Row>
    
    
    )
    return (
        <div className="App img">
            <div className="App img" style={{
            height:"100%"
          }}>
            <NavBarHome/>
            <Container >
                <h1 className="slogan">Your sweet home away from home</h1>
                <div className="buttonImg" >
                    <a href='#down'> 
                        <img src={scroll} className="buttonImg2"  width="10%"/> 
                        <a className="buttonImgLink" href='#down'>Ver mais</a>
                    </a>
                </div>
             </Container>
            </div>
            <Search/>
            {content}
        </div>

    )
}

export default Homepage
