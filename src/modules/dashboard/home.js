import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import styled, { css } from 'styled-components'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
//import { useContextUser} from './../../context/user-context'
import {Routes, Route, useNavigate} from 'react-router-dom';

const DivHeader = styled.div`
padding-bottom: 30px;
`;
const CardPrincipal = styled.div`
padding: 35px;
`;
const DivBannerText = styled.div`
display: flex;
align-items: revert;
justify-content: center;
flex-direction: column;
padding-left: 40px;
padding-right: 30px;
`;
const CardClickable = styled.div`
padding-top: 20px;
padding-bottom: 20px;
padding-left: 20px;
padding-right: 20px;
`;

function Home() {
    const navigate = useNavigate();
    const id = "62943f5d0b8aac48a4a52862";
    //const {user} = useContextUser ();
    const [user, setUser] = useState({
        id: '',
        name: '',
        email : '',
        lastName: '',
        clientType: '',
        ruc:'',
        address: '',
        status:'',
        passwordConfirm:'',
      });
    var description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";
    
    const [passwordConfirm, setPassword] = useState();
    const [modalPass, setModalPass] = useState(false); 
    const handleChange = e =>{
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
        console.log(user);
    }

    const peticionGet = async ()=>{
        await axios.get("http://localhost:8080/client/getClient/"+id)
        .then(response=>{
            console.log('data:::::::', response.data)
            setUser(response.data.client);
        }).catch(
          error =>{
            console.log('error:::::::', error)
          }
        )
    }

    useEffect(()=>{
        peticionGet();
    }, [])

    const modalStatus =()=>{
        setModalPass(!modalPass);
    }

    const validatePassword=()=>{
        console.log('user  ', user.ruc)
        console.log('passwordConfirm  ', user.passwordConfirm)
        if(user.ruc == user.passwordConfirm){
            alert("Contraseña correcta. Redirigiendo...")
            navigate('/blog');
        }else{
            alert("Contraseña incorrecta")
        }                
    }
    
    return (
        <div className="row">
            <div className="card" >
                <CardPrincipal >                
                    <DivHeader className="form-horizontal " >
                            <h5 style={{fontSize: '1.0rem'}}>Nueva solicitud de trámite</h5>
                            <h4 style={{color: '#EE6430'}}>Trámites que puedes realizar</h4>
                            <h5 style={{fontSize: '1.0rem'}}>Para el afiliado: <b style={{color: '#EE6430', fontSize: '1.0rem'}}>{user.name + ' '+ user.lastName}</b> </h5> 
                    </DivHeader>
                    <div className="form-horizontal " style={{backgroundColor: '#f0fbf9'}} >
                        <Row className="item form-group col-md-12 col-sm-12">
                                <Col className="col-md-4 col-sm-4 "> 
                                    <img src={require('./img1.png')} />
                                </Col>    
                                <DivBannerText className="col-md-8 col-sm-8 col" >
                                    <b style={{fontSize: '2.0rem'}}>Por jubilación y retiro 95.5%</b>
                                    <br></br>
                                    {description} 
                                </DivBannerText>
                        </Row>                        
                    </div>

                </CardPrincipal>

                <CardPrincipal >
                    <DivHeader className="form-horizontal " >
                            <h5 style={{fontSize: '1.0rem', color: 'rgb(138 188 179)'}}>Otras pensiones </h5>
                    </DivHeader>
                    <Row className="item form-group col-md-12 col-sm-12">
                        <Col className="col-md-3 col-sm-3 ">
                            <button onClick={() => modalStatus()} style={{border:'none'}} className="btn-block">
                                <CardClickable className="card "> 
                                    <b>Fondo complementario de jubilación minera</b>                                   
                                    Obtén el pago complementario si tienes este beneficio
                                </CardClickable>
                            </button>
                        </Col>
                        <Col className="col-md-3 col-sm-3 ">
                            <button onClick={() => modalStatus()} style={{border:'none'}} className="btn-block">
                                <CardClickable className="card "> 
                                <b>Jubilación por régimen pesquero</b>
                                Pensión que puedes obtener si trabajas en pesca
                                </CardClickable>
                            </button>
                        </Col>
                        {user.clientType == "PERSON" &&
                        <>
                            <Col className="col-md-3 col-sm-3 ">
                                <button onClick={() => modalStatus()} style={{border:'none'}} className="btn-block">
                                    <CardClickable className="card "> 
                                    <b>Pensión complementaria de pensión mínima</b>
                                    Obtén el pago complementario si tienes este beneficio
                                    </CardClickable>
                                </button>
                            </Col>
                            <Col className="col-md-3 col-sm-3 ">
                                <button onClick={() => modalStatus()} style={{border:'none'}}>
                                    <CardClickable className="card "> 
                                    <b>Pensión mínima de jubilación</b>
                                    Pensión que puedes obtener si trabajas en pesca
                                    </CardClickable>
                                </button>
                            </Col>  
                        </>

                        }
                    
                    </Row>     
                </CardPrincipal>
            </div>

            <Modal isOpen={modalPass} >
                <ModalHeader>
                Confirmar contraseña
                </ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Contraseña: </label> 
                        <br/>
                            <input type ="password" className='form-control' onChange={handleChange} name='passwordConfirm'/>
                        <br />           
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={()=>validatePassword()}>Confirmar</button>{""}
                    <button className='btn btn-danger' onClick={()=>modalStatus()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            
        </div>    
    );
}

export default  Home ;