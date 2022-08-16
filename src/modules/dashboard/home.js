import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import styled, { css } from 'styled-components'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {Routes, Route, useNavigate} from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    const id = "62943f5d0b8aac48a4a52862";
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
    
    const Button = styled.button`
        background: #EE6430;
        border-radius: 3px;
        border: 2px solid palevioletred;
        color: WHITE;
        margin: 0.5em 1em;
        padding: 0.25em 1em;
    `;

   

    return (
        <div className="row">

            <Card >
                <h5>Nueva solicitud de trámite</h5>
                <Card.Title style={{color: '#EE6430'}}>Trámites que puedes realizar</Card.Title>
                <h5>Para el afiliado: <b style={{color: '#EE6430'}}>{user.name + ' '+ user.lastName}</b> </h5> 

                <div className="form-horizontal " style={{backgroundColor: '#f0fbf9'}} >
                    <Row className="item form-group col-md-12 col-sm-12">
                            <Col className="col-md-4 col-sm-4 "> 
                                <img src={require('./img1.png')} />
                            </Col>    
                            <Col className="col-md-8 col-sm-8 " >
                                <b>Por jubilación y retiro 95.5%</b>
                                <br></br>
                                {description} 
                            </Col>
                    </Row>                        
                </div>

            </Card>

            <Card >
                <Row className="item form-group col-md-12 col-sm-12">
                      <Col className="col-md-3 col-sm-3 ">
                        <button onClick={() => modalStatus()} style={{border:'none'}}>
                            <Card> 
                                <b>Fondo complementario de jubilación minera</b>
                                <br></br>
                                Obtén el pago complementario si tienes este beneficio
                            </Card>
                        </button>
                      </Col>
                      <Col className="col-md-3 col-sm-3 ">
                        <button onClick={() => modalStatus()} style={{border:'none'}}>
                            <Card>
                            <b>Jubilación por régimen pesquero</b>
                            <br></br>
                            Pensión que puedes obtener si trabajas en pesca
                            </Card>
                        </button>
                      </Col>
                      {user.clientType == "PERSON" &&
                      <>
                        <Col className="col-md-3 col-sm-3 ">
                            <button onClick={() => modalStatus()} style={{border:'none'}}>
                                <Card>
                                <b>Pensión complementaria de pensión mínima</b>
                                <br></br>
                                Obtén el pago complementario si tienes este beneficio
                                </Card>
                            </button>
                        </Col>
                        <Col className="col-md-3 col-sm-3 ">
                            <button onClick={() => modalStatus()} style={{border:'none'}}>
                                <Card>
                                <b>Pensión mínima de jubilación</b>
                                <br></br>
                                Pensión que puedes obtener si trabajas en pesca
                                </Card>
                            </button>
                        </Col>  
                      </>

                      }
                 
                </Row>     
            </Card>

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