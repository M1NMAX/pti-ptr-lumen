import React from 'react';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap'
//import {connect} from 'react-redux';
import DefaultRoomPic from "../../img/basicRoom.png"
import NavBarHome from '../../Components/NavBarHome'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
//const axios = require('axios');
import ImageUploading from 'react-images-uploading';

function ProfileAlojamento () {
    const [images, setImages] = React.useState([]);
  const maxNumber = 69;
 
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const interesse = () => {
    /**return (<div className="date-range">
        <p>O senhorio foi informado do seu interesse e irá contactá-lo em breve</p>
    </div>);*/

    alert("O senhorio foi informado do seu interesse e irá contactá-lo em breve");
  };

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
        .catch(err=>console.log(err))
    }*/

  /** 
    componentDidMount(){
     this.fetchUserDetails(this.state.user_id);
    }
    **/
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
            <div>
                <NavBarHome/>
                <Container>
                <Row>
                    <Col >
                        <img src={profilePic} alt="profils pic" className="imagem" />
                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                            }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                Click or Drop here
                                </button>
                                &nbsp;
                                {/*<button onClick={onImageRemoveAll}>Remove all images</button>*/}
                                {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="100%" />
                                    <div className="image-item__btn-wrapper">
                                    {/*<button onClick={() => onImageUpdate(index)}>Update</button>*/}
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}
                        </ImageUploading>
                    </Col>
                    <Col>
                        <Form.Group controlId="formCategory1">
                            <Form.Control type="text" defaultValue={titulo}/>
                        </Form.Group>
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
                                <Form.Control type="number" defaultValue="2"/>
                            </Form.Group>
                            <Form.Group controlId="formCategory5">
                                <Form.Label>Número de casas de banho:</Form.Label>
                                <Form.Control type="number" defaultValue="2" />
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
                            <Form.Group controlId="formCategory8">
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
                            <Form.Group controlId="formCategory9">
                                <Form.Label>Limpeza:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"propria" === "propria"}
                                    type="radio"
                                    label="Cada um faz a sua própria"
                                    name="propria"
                                    id="propria"
                                    />
                                    <Form.Check
                                    checked={"propria"=== "profissionais"}
                                    type="radio"
                                    label="É feita por profissionais"
                                    name="profissionais"
                                    id="profissionais"
                                    />
                                </Col>
                            </Form.Group>

                            <h3 class="w3-border-top">Requisitos dos inquilinos</h3>
                            <Form.Group controlId="formCategory10">
                                <Form.Label>Faixa Etária:</Form.Label>
                                <Form.Control type="number" min="17" max="26" defaultValue="18" />
                                <Form.Control type="number" min="18" max="27" defaultValue="23" />
                            </Form.Group>
                            <Form.Group controlId="formCategory11">
                                <Form.Label>Género preferecial:</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"m" === "m"}
                                    type="radio"
                                    label="Masculino"
                                    name="m"
                                    id="m"
                                    />
                                    <Form.Check
                                    checked={"m"=== "f"}
                                    type="radio"
                                    label="Feminino"
                                    name="f"
                                    id="f"
                                    />
                                    <Form.Check
                                    checked={"m"=== "mix"}
                                    type="radio"
                                    label="Misto"
                                    name="mix"
                                    id="mix"
                                    />
                                    <Form.Check
                                    checked={"ind" === "m"}
                                    type="radio"
                                    label="Indiferente"
                                    name="ind"
                                    id="ind"
                                    />                                
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory12">
                                <Form.Label>Permite fumadores?</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"simF" === "simF"}
                                    type="radio"
                                    label="Sim"
                                    name="simF"
                                    id="simF"
                                    />
                                    <Form.Check
                                    checked={"simF"=== "naoF"}
                                    type="radio"
                                    label="Não"
                                    name="naoF"
                                    id="naoF"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory13">
                                <Form.Label>Permite animais de estimação?</Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    checked={"simA" === "simA"}
                                    type="radio"
                                    label="Sim"
                                    name="simA"
                                    id="simA"
                                    />
                                    <Form.Check
                                    checked={"simA"=== "naoA"}
                                    type="radio"
                                    label="Não"
                                    name="naoA"
                                    id="naoA"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="formCategory14">
                                <Form.Label>Outras informações complementares:</Form.Label>
                                <Form.Control type="text" defaultValue=""/>
                            </Form.Group>
                            
                           {/* <Form.Group controlId="formCategory15">
                                    <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage}/>
                            </Form.Group>
                            <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button>*/}
                        </Form>
                    </Col>

                </Row>
                </Container>
            </div>
        )
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