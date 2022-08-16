import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css'
import styled, { css } from 'styled-components'
import axios from 'axios'

function Profile() {
    const navigate = useNavigate();
    const id = "62943f5d0b8aac48a4a52862";
    const options = [
        { value: 'PERSON', label: 'Tipo 1' },
        { value: 'BUSINESS', label: 'Tipo 2' },
      ]

      const [user, setUser] = useState({
        id: '',
        name: '',
        email : '',
        lastName: '',
        clientType: '',
        ruc:'',
        address: '',
        status:'',
      });
      

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
            response.data.client.passwordConfirm = response.data.client.ruc;
            setUser(response.data.client);
            
        }).catch(
          error =>{
            console.log('error:::::::', error)
          }
        )
    }

    const updateProfile = () =>{
        console.log('update::::', user);
        if(user.ruc == user.passwordConfirm){
            peticionPut();
        }else{
            alert('Contraseñas erróneas')
        }
    }

    const peticionPut = async ()=>{

        await axios.put("http://localhost:8080/client/update" + "/" + user.id , user  ) 
        .then(response=>{
            alert('Datos actualizados c:')
            navigate(0);
        }).catch(
          error =>{
            console.log('error peticionPut:::::::', error)
          }
        )
      }

    useEffect(()=>{
        peticionGet();
    }, [])   
    
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
                <Card.Title>Datos del usuario</Card.Title>
                <Card.Title style={{color: '#EE6430'}}>Editar perfil</Card.Title>

                    <div className="form-horizontal " >
                            <Row className="item form-group col-md-12 col-sm-12">
                                    <Col> <label className="col-form-label col-md-4 col-sm-4 label-align"  >Full Name </label>  </Col>
                                    <Col className="col-md-4 col-sm-4 ">
                                        <input type="text" id="name" name="name" required="required" className="form-control" onChange={handleChange} value={user.name} placeholder='First' />
                                    </Col>
                                    <Col className="col-md-4 col-sm-4 ">
                                        <input type="text" id="lastName" name="lastName" required="required" className="form-control" onChange={handleChange}  value={user.lastName}  placeholder='Last Name' />
                                    </Col>
                            </Row>  

                            <Row className="item form-group col-md-12 col-sm-12">
                                    <Col> <label className="col-form-label col-md-4 col-sm-4 label-align"  >Company Name </label></Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="companyName" name="companyName" required="required" className="form-control" onChange={handleChange} readOnly />
                                    </Col>
                            </Row>  

                            <Row className="item form-group col-md-12 col-sm-12">
                                    <Col> <label className="col-form-label col-md-4 col-sm-4 label-align"  >Email address </label></Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="email" name="email" required="required" className="form-control" onChange={handleChange}  value={user.email}  />
                                    </Col>
                            </Row>                         
                    </div>

                    <div className="form-horizontal " >
                            <Row className="item form-group col-md-12 col-sm-12">
                                    <Col> <label className="col-form-label col-md-4 col-sm-4 label-align"  >Address </label></Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="address" name="address" required="required" className="form-control" onChange={handleChange}  value={user.address}  />
                                    </Col>
                            </Row>  

                            <Row className="item form-group col-md-12 col-sm-12">
                                    <Col> <label className="col-form-label col-md-4 col-sm-4 label-align"  >Optional </label> </Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="optional" name="optional" required="required" className="form-control" onChange={handleChange} readOnly />
                                    </Col>
                            </Row>  

                            <Row className="item form-group col-md-12 col-sm-12">
                                    <Col><label className="col-form-label col-md-4 col-sm-4 label-align"  >City</label> </Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="city" name="city" required="required" className="form-control" onChange={handleChange}  readOnly />
                                    </Col>
                            </Row>           

                            <Row className="item form-group col-md-12 col-sm-12">
                                    <Col><label className="col-form-label col-md-4 col-sm-4 label-align"  >Type of client </label></Col>
                                    <Col className="select-container col-md-8 col-sm-8 ">
                                        <select className="form-control"  name="clientType"  value={user.clientType} onChange={handleChange}>
                                            {options.map((option) => (
                                            <option value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </Col>
                            </Row>  

                            <Row className="item form-group col-md-12 col-sm-12">
                                    <Col><label className="col-form-label col-md-4 col-sm-4 label-align"  >State/ Province</label></Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="state" name="state" required="required" className="form-control" onChange={handleChange}  readOnly/>
                                    </Col>
                            </Row>   
                        
                    </div>

                    <div className="form-horizontal "  >
                        <h4>Account</h4>
                        <h4>Other preferences</h4>
                        <Row className="item form-group col-md-12 col-sm-12">
                                    <Col><label className="col-form-label col-md-3 col-sm-3 label-align"  >Password </label></Col>
                                    <Col className="col-md-4 col-sm-4 ">
                                        <input type="password" id="password" name="ruc" required="required" className="form-control" onChange={handleChange} placeholder='Password' value={user.ruc} />
                                    </Col>
                                    <Col className="col-md-4 col-sm-4 ">
                                        <input type="password" id="password1" name="passwordConfirm" required="required" className="form-control" onChange={handleChange} placeholder='Confirm password' value={user.passwordConfirm} />
                                    </Col>
                        </Row> 
                    </div>

            </Card>
            <div>
                <Button variant="primary" type="submit" onClick={()=>updateProfile()}>Guardar</Button>
            </div>
            
        </div>    


 
    );
}

export default  Profile ;