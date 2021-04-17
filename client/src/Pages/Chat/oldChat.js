import NavBarHome from '../../Components/NavBarHome'
import { ChatList } from 'react-chat-elements'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../Login/index.css'
import DefaultUserPic from "../../img/standartUser3.png";

function Chat() {
    var users = ['Pedro', 'João', 'Gonçalo', 'Carolina', 'José', 'Madalena']
    var msg = ['OI', 'hahaha yaa', 'Sempre às ordens', 'Ah oki oki', 'Hello?', 'uhhh']
    const n = 6; //numero de chats deste user
    const content = [...Array(n)].map((e, i) => 
    <Row>
        <Col>
        <ChatList
            className='chat-list'
            dataSource={[
                {
                avatar: DefaultUserPic,
                alt: 'Imagem de perfil',
                title: users[i],
                subtitle: msg[i],
                date: new Date(),
                unread: 0,
                }
            ]} />

        </Col>
    </Row>
    )

    return(
        <div>
        <NavBarHome/>
        <Container fluid='sm'>
        {content}
        </Container>
        </div>
    )
}
export default Chat
