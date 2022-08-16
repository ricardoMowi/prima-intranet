import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Collapsible from 'react-collapsible';
import 'bootstrap/dist/css/bootstrap.min.css'

function Blogs() {
    var description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";

    useEffect(()=>{
        console.log('test:::::')
    }, [])

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