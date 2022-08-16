import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Collapsible from 'react-collapsible';
import 'bootstrap/dist/css/bootstrap.min.css'
import styled, { css } from 'styled-components'

const DivHeader = styled.div`
padding-bottom: 30px;
`;
const CardPrincipal = styled.div`
padding: 35px;
`;
const DivCollapse = styled.div`
margin: 0px;
`;
const DivItem = styled.div`
padding: 20px;
`;
const Li = styled.li`
&:before  {
  content: "\2022";
  color: "red";
}
`;

function Blogs() {
    var description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";

    useEffect(()=>{
        console.log('test:::::')
    }, [])

    return (
        <div className="row">
            <CardPrincipal className="card" >

                <DivHeader className="form-horizontal " >
                            <h5 style={{fontSize: '1.0rem'}}>Nueva solicitud de trámite</h5>
                            <h4 style={{color: '#EE6430'}}>Bono de reconocimiento</h4>
                </DivHeader>

                <div className="form-horizontal " >
                    <Row className="item form-group col-md-12 col-sm-12 row" style={{ marginBottom: '20px'}}>
                      <Form.Text className="text-muted">
                        {description}
                      </Form.Text>
                    </Row>  

                    <DivCollapse className="item form-group col-md-12 col-sm-12 row card" style={{ padding: '15px'}}>
                        <Collapsible trigger="Importante"  >
                          <DivItem>
                            <ul>
                              <Li>
                                {description}
                              </Li>
                              <Li>
                                {description}
                              </Li>
                            </ul>
                          </DivItem>
                        </Collapsible>
                    </DivCollapse>    

                </div>

            </CardPrincipal>            
        </div>     
    );
}

export default  Blogs ;