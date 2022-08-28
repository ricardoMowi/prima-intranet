import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import styled, { css } from 'styled-components'
import axios from 'axios'
import Wizard from '../../components/wizard'


import ReactGA from "react-ga";


const Button = styled.button`
background: #EE6430;
border-radius: 3px;
border: 2px solid palevioletred;
color: WHITE;
margin: 0.5em 1em;
padding: 0.25em 1em;
`;

const DivForm = styled.div`
padding-bottom: 10px;
`;
const DivGroup = styled.div`
padding-top: 20px;
padding-bottom: 20px;
`;
const DivHeader = styled.div`
padding-bottom: 10px;
`;
const CardPrincipal = styled.div`
padding: 35px;
`;

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

    const UseAnalyticsEventTracker = (category="Blog category") => {
        const eventTracker = (action = "test action", label = "test label") => {
          ReactGA.event({category, action, label});
        }
        return eventTracker;
      }
    
      const eventTrack = (category, action, label) => {
        console.log("GA event:", category, ":", action, ":", label);
        ReactGA.event({
          category: category,
          action: action,
          value: user.email,
          label: label,
        })
      }

    const updateProfile = () =>{
        console.log('update::::', user);
        eventTrack('profile screen', 'update data' ,'button');
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
    


    return (
        <div className="row">

            <Wizard/>
            
            <CardPrincipal className="card" >
                    <DivHeader className="form-horizontal " >
                        <h5 style={{fontSize: '1.0rem'}}>Datos del usuario</h5>
                        <h4 style={{color: '#EE6430'}}>Editar perfil</h4>
                    </DivHeader>
                    <DivGroup className="form-horizontal " >
                            <DivForm className="item form-group col-md-12 col-sm-12 row">
                                    <Col style={{textAlign: 'right'  }}> <label>Full Name </label>  </Col>
                                    <Col className="col-md-4 col-sm-4 ">
                                        <input type="text" id="name" name="name" required="required" className="form-control" onChange={handleChange} value={user.name} placeholder='First' />
                                    </Col>
                                    <Col className="col-md-4 col-sm-4 ">
                                        <input type="text" id="lastName" name="lastName" required="required" className="form-control" onChange={handleChange}  value={user.lastName}  placeholder='Last Name' />
                                    </Col>
                            </DivForm>  

                            <DivForm className="item form-group col-md-12 col-sm-12 row">
                                    <Col style={{textAlign: 'right'  }}> <label >Company Name </label></Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="companyName" name="companyName" required="required" className="form-control" onChange={handleChange} readOnly />
                                    </Col>
                            </DivForm>  

                            <DivForm className="item form-group col-md-12 col-sm-12 row">
                                    <Col style={{textAlign: 'right'  }}> <label >Email address </label></Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="email" name="email" required="required" className="form-control" onChange={handleChange}  value={user.email}  />
                                    </Col>
                            </DivForm>                         
                    </DivGroup>

                    <DivGroup className="form-horizontal " >
                            <DivForm className="item form-group col-md-12 col-sm-12 row">
                                    <Col style={{textAlign: 'right'  }}> <label >Address </label></Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="address" name="address" required="required" className="form-control" onChange={handleChange}  value={user.address}  />
                                    </Col>
                            </DivForm>  

                            <DivForm className="item form-group col-md-12 col-sm-12 row">
                                    <Col style={{textAlign: 'right'  }}> <label >Optional </label> </Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="optional" name="optional" required="required" className="form-control" onChange={handleChange} readOnly />
                                    </Col>
                            </DivForm>  

                            <DivForm className="item form-group col-md-12 col-sm-12 row">
                                    <Col style={{textAlign: 'right'  }}> <label >City</label> </Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="city" name="city" required="required" className="form-control" onChange={handleChange}  readOnly />
                                    </Col>
                            </DivForm>           

                            <DivForm className="item form-group col-md-12 col-sm-12 row">
                                    <Col style={{textAlign: 'right'  }}> <label >Type of client </label></Col>
                                    <Col className="select-container col-md-8 col-sm-8 ">
                                        <select className="form-control"  name="clientType"  value={user.clientType} onChange={handleChange}>
                                            {options.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </Col>
                            </DivForm>  

                            <DivForm className="item form-group col-md-12 col-sm-12 row">
                                    <Col style={{textAlign: 'right'  }}> <label >State/ Province</label></Col>
                                    <Col className="col-md-8 col-sm-8 ">
                                        <input type="text" id="state" name="state" required="required" className="form-control" onChange={handleChange}  readOnly/>
                                    </Col>
                            </DivForm>   
                        
                    </DivGroup>

                    <DivGroup className="form-horizontal "  >
                        <DivHeader className="form-horizontal " >
                            <h4>Account</h4>
                            <h5 style={{fontSize: '1.0rem'}}>Other preferences</h5>                            
                        </DivHeader>

                        <DivForm className="item form-group col-md-12 col-sm-12 row">
                                    <Col style={{textAlign: 'right'  }}> <label >Password </label></Col>
                                    <Col className="col-md-4 col-sm-4 ">
                                        <input type="password" id="password" name="ruc" required="required" className="form-control" onChange={handleChange} placeholder='Password' value={user.ruc} />
                                    </Col>
                                    <Col className="col-md-4 col-sm-4 ">
                                        <input type="password" id="password1" name="passwordConfirm" required="required" className="form-control" onChange={handleChange} placeholder='Confirm password' value={user.passwordConfirm} />
                                    </Col>
                        </DivForm> 
                    </DivGroup>

            </CardPrincipal>
            <div style={{display: 'flex',  justifyContent: 'center'}}>
                <Button variant="primary" type="submit" onClick={()=>updateProfile()} >Guardar</Button>
            </div>            
            
        </div>    


 
    );
}

export default  Profile ;