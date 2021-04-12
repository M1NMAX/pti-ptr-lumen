import React from 'react';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
//import {connect} from 'react-redux';
import DefaultRoomPic from "../img/basicRoom.png";
//const axios = require('axios');

class ProfileAlojamento extends React.Component {
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
            var profilePic=DefaultRoomPic;
        {/*}*/ }
        var titulo = "Quarto num apartamento T2 só para rapazes";
        return (
            <Container>
            <Row>
                <Col>
                        <img src={profilePic} alt="profils pic" />
                        <button class="interesse w3-center">Estou interessado!</button> <button class="interesse w3-center"> <i class="fa fa-envelope"></i></button>
                </Col>
                <Col>
                    <h3> {titulo} </h3>
                    <Form className="form">     
                        <Form.Group controlId="formCategory1">
                            <Form.Label>Morada:</Form.Label>
                            <Form.Control type="text" defaultValue="Rua do sol"/>
                        </Form.Group>
                        <Form.Group controlId="formCategory2">
                            <Form.Label>Preço:</Form.Label>
                            <Form.Control type="text" defaultValue="100€" />
                        </Form.Group>
                        <Form.Group controlId="formCategory3">
                            <Form.Label>Estado de ocupação:</Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                checked={"desocupado" === "ocupado"}
                                type="radio"
                                label="Ocupado"
                                name="ocupado"
                                id="ocupado"
                                />
                                <Form.Check
                                checked={"desocupado"=== "desocupado"}
                                type="radio"
                                label="Desocupado"
                                name="desocupado"
                                id="desocupado"
                                />
                                <Form.Check
                                checked={"desocupado"=== "tenhoAlojamento"}
                                type="radio"
                                label="Reservado"
                                name="reservado"
                                id="reservado"
                                />
                            </Col>
                        </Form.Group>
                        <h3 class="w3-border-top">Informações sobre o Alojamento</h3>
                        <Form.Group controlId="formCategory4">
                            <Form.Label>Número de quartos: :</Form.Label>
                            <Form.Control type="int" defaultValue="2"/>
                        </Form.Group>
                        <Form.Group controlId="formCategory5">
                            <Form.Label>Número de casas de banho:</Form.Label>
                            <Form.Control type="int" defaultValue="2" />
                        </Form.Group>
                        <Form.Group controlId="formCategory6">
                            <Form.Label>Área: </Form.Label>
                            <Form.Control type="text" defaultValue="100m<sup>2</sup>"/>
                        </Form.Group>
                        <Form.Group controlId="formCategory7">
                            <Form.Label>Orientação solar:</Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                checked={"n" === "n"}
                                type="radio"
                                label="Norte (N)"
                                name="n"
                                id="ne"
                                />
                                <Form.Check
                                checked={"n"=== "ne"}
                                type="radio"
                                label="Nordeste (NE)"
                                name="ne"
                                id="ne"
                                />
                                <Form.Check
                                checked={"n"=== "e"}
                                type="radio"
                                label="Este (E)"
                                name="e"
                                id="e"
                                />
                                 <Form.Check
                                checked={"n" === "se"}
                                type="radio"
                                label="Sudeste (SE)"
                                name="se"
                                id="se"
                                />
                                <Form.Check
                                checked={"n"=== "s"}
                                type="radio"
                                label="Sul (S)"
                                name="s"
                                id="s"
                                />
                                <Form.Check
                                checked={"n"=== "so"}
                                type="radio"
                                label="Sudoeste (SO)"
                                name="so"
                                id="so"
                                />
                                <Form.Check
                                checked={"n"=== "o"}
                                type="radio"
                                label="Oeste (O) "
                                name="o"
                                id="o"
                                />
                                <Form.Check
                                checked={"n"=== "no"}
                                type="radio"
                                label="Noroeste (NO)"
                                name="no"
                                id="no"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="formCategory9">
                            <Form.Label>Acesso à Internet:</Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                checked={"existe" === "existe"}
                                type="radio"
                                label="Existe"
                                name="existe"
                                id="existe"
                                />
                                <Form.Check
                                checked={"existe"=== "naoExiste"}
                                type="radio"
                                label="Não existe"
                                name="naoExiste"
                                id="naoExiste"
                                />
                            </Col>
                        </Form.Group>


            {/* _______________________*/}
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
   

  // export default connect(mapStatetoProps)(ProfileAlojamento);
  export default ProfileAlojamento;