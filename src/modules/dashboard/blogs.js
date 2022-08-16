import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Collapsible from 'react-collapsible';
import 'bootstrap/dist/css/bootstrap.min.css'
import styled, { css } from 'styled-components'

function Blogs() {
    const { id } = "10"; 
    var description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";
    const isAddMode = !id;
    const title = "Hola";
    const [modal, setModal] = useState(true);
    const options = [
        { value: 'Peru', label: 'Perú' },
        { value: 'Argentina', label: 'Argentina' },
        { value: 'Chile', label: 'Chile' }
      ]

    const [profile, setProfile] = useState({
        id: '',
        name: '',
        lastName: 'First',
        companyName: '',
        email : '',
        clientType: 'PERSON',
        address: 'Direccion test',
        city:'',
        country:'',
        password:'',
        status:'ACTIVE',
      })

    const handleChange = e =>{
        const {name, value} = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
        console.log(profile);
    }

    useEffect(()=>{
        console.log('test:::::')
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
                <h5>Nueva solicitud de trámite</h5>
                <Card.Title style={{color: '#EE6430'}}>Bono de reconocimiento</Card.Title>

                    <div className="form-horizontal " >
                            <Row className="item form-group col-md-12 col-sm-12">
                              <Form.Text className="text-muted">
                                {description}
                              </Form.Text>
                            </Row>  

                            <Row className="item form-group col-md-12 col-sm-12">
                                <Collapsible trigger="Importante">
                                  <p>
                                   {description}
                                  </p>
                                  <p>
                                   {description}
                                  </p>
                                </Collapsible>
                            </Row>  

                            
                    </div>


            </Card>

            
        </div>    


 
    );
}

export default  Blogs ;