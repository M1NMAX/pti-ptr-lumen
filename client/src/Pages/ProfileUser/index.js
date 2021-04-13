import React from 'react';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
//import {connect} from 'react-redux';
import DefaultUserPic from "../../img/standartUser3.png";
import NavBarHome from '../../Components/NavBarHome';
//const axios = require('axios');

class ProfileUser extends React.Component {
    /**constructor(props){
        super(props);
        this.state={
            user_id:this.props.user_id,
            username:this.props.username,
            email:this.props.email,
            profileImage:this.props.profileImage,
            msg:this.props.msg,
            uploadedFile:null
        }
    }

    fetchUserDetails=(user_id)=>{
        //console.log(user_id);
        axios.get("http://localhost:5000/userapi/getUserDetails/"+user_id,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
            this.setState({email:res.data.results[0].email});
            this.setState({profileImage:res.data.results[0].profileImage})
        })
        .catch(err=>console.log(err))
    }
    */
    changeProfileImage=(event)=>{
       
        this.setState({uploadedFile:event.target.files[0]});
    }

    UpdateProfileHandler=(e)=>{
        e.preventDefault();
        //create object of form data
        const formData=new FormData();
        formData.append("profileImage",this.state.uploadedFile);
        formData.append("user_id","Test");
/*
        //update-profile
        axios.post("http://localhost:3000/scr/profilePics/",formData,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
           this.setState({msg:res.data.message});
           this.setState({profileImage:res.data.results.profileImage});
        })
        .catch(err=>console.log(err))*/
    }

  /** 
    componentDidMount(){
     this.fetchUserDetails(this.state.user_id);
    }
    **/
     render(){
{/**
       if(this.state.profileImage){
            var imagestr=this.state.profileImage;
            imagestr = imagestr.replace("public/", "");
            var profilePic="http://localhost:5000/"+imagestr;
        }else{*/ }
            var profilePic=DefaultUserPic;
        {/*}*/ }

        return (
            <div>
                <NavBarHome/>
                <Container>
                <Row>
                    <Col>
                            <img src={profilePic} alt="profils pic" />
                    </Col>
                    <Col>
                        <h1>Página de Perfil</h1>
                        <Form className="form">     
                        {   /* <p>{this.state.msg}</p> */}
                            <Form.Group controlId="formCategory1">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" defaultValue="0DragonFire0"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory2">
                                <Form.Label>Nome Completo:</Form.Label>
                                <Form.Control type="email" defaultValue="João" />
                            </Form.Group>
                            <Form.Group controlId="formCategory3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="text" defaultValue="checheche@gmail.com"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory4">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" defaultValue="oi"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory5">
                                <Form.Label>Data de Nascimento:</Form.Label>
                                <Form.Control type="text" defaultValue="21/01/2000" />
                            </Form.Group>
                            <Form.Group controlId="formCategory6">
                                <Form.Label>Nº de contribuinte:</Form.Label>
                                <Form.Control type="text" defaultValue="123457789"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory7">
                                <Form.Label>Características Pessoais:</Form.Label>
                                <Form.Control type="text" defaultValue="Organizado, vou para a cama cedo, gosto de limpar casas de banho" />
                            </Form.Group>
                            <Form.Group controlId="formCategory8">
                                <Form.Label>Preferências:</Form.Label>
                                <Form.Control type="text" defaultValue="Gostava de viver só com rapazes, de preferência da faculdade onde ando"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory9">
                                <Form.Label>Estou interessado em:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"alugarAlojamento" === "alugarAlojamento"}
                                    type="radio"
                                    label="Alugar um alojamento"
                                    name="alugarAlojamento"
                                    id="alugarAlojamento"
                                    />
                                    <Form.Check
                                    checked={"alugarAlojamento"=== "tenhoAlojamento"}
                                    type="radio"
                                    label="Tenho um alojamento para alugar"
                                    name="tenhoAlojamento"
                                    id="tenhoAlojamento"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory10">
                                <Form.Label>Instituição:</Form.Label>
                                <Form.Control type="text" defaultValue="UL-FCUL"/>
                            </Form.Group>
                        <Form.Group controlId="formCategory4">
                                <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage}/>
                            </Form.Group>
                <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button>
                        </Form>
                    </Col>

                </Row>
                </Container>
            </div>
        )
    }
}

    /**const mapStatetoProps=(state)=>{
        return{
            user_id:state.user.userDetails.userid,
            username:state.user.userDetails.username,
        email:state.user.email,
        profileImage: state.user.profileImage,
        msg:state.user.msg
        }
    }
   */
   

  // export default connect(mapStatetoProps)(UserProfile);
  export default ProfileUser;