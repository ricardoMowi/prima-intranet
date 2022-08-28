import React, {useState} from 'react';
import StepWizard from 'react-step-wizard';
import styled, { css } from 'styled-components'
import Col from 'react-bootstrap/Col';
import ReactGA from "react-ga";

const DivForm = styled.div`
padding-bottom: 10px;
`;

const Button = styled.button`
background: #EE6430;
border-radius: 3px;
border: 2px solid palevioletred;
color: WHITE;
margin: 0.5em 1em;
padding: 0.25em 1em;
`;

const ColCenter = styled.div`
padding: 10px;
display: flex;
align-items: center;
justify-content: center;
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

const options = [
    { value: 'DNI', label: 'D.N.I' },
]

const optionsAFP = [
    { value: 'type_1', label: 'Bono tipo 1' },
    { value: 'type_2', label: 'Bono tipo 2' },
]

const cancelRegister =()=>{
    alert('Vamos a cancelar')
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



const InstanceDemo = ({ instance }) => (
  <>     
      <div>
        <DivForm className="item form-group col-md-12 col-sm-12 row">
            <ColCenter className="col-md-4 col-sm-4 ">
                <Button className={'btn btn-secondary'} onClick={instance.previousStep}>Regresar</Button>
            </ColCenter>
            <ColCenter className="col-md-4 col-sm-4 ">
                <Button className={'btn btn-secondary'} onClick={instance.nextStep}>Siguiente</Button>
            </ColCenter>
            <ColCenter className="col-md-4 col-sm-4 ">
                <button className={'btn btn-secondary'} onClick={cancelRegister}>Cancelar</button>
            </ColCenter>
        </DivForm>  
      </div>
  </>
);

const Gal = (props) => <div {...props}>{props.children}</div>

export default function WizardCustom() {
  const [instance, updateInstance] = useState();

  const setInstance = SW => updateInstance(SW);
  const [user, setUser] = useState({
    id: '',
    name: '',
    lastName: '',
    secondLastName: '',
    documentType: '', 
    documentNumber: '', 
    clientType: '',
    fundType: '', 
    status:'',
  });
  return (
    <div>
      <CardPrincipal className="card" >
        <StepWizard initialStep={'step1'} instance={setInstance}>
            <Gal stepName={'step1'}>
                <div  >
                        <DivHeader className="form-horizontal " >
                            <h4 style={{color: '#EE6430'}}>¡Cambiate a Prima AFP!</h4>
                        </DivHeader>

                        <DivGroup className="form-horizontal " >  
                                <DivHeader className="form-horizontal " >
                                        <h5 style={{fontSize: '1.0rem', color: 'rgb(138 188 179)'}}>Ingresa tu documento de identidad </h5>
                                </DivHeader>
                                <ColCenter className="item form-group col-md-12 col-sm-12 row">
                                        <Col className="select-container col-md-6 col-sm-6 ">
                                            <select className="form-control" value={user.documentType} name="clientType" >
                                                {options.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                                ))}
                                            </select>
                                        </Col>
                                </ColCenter>  

                                <ColCenter className="item form-group col-md-12 col-sm-12 row">
                                        <Col className="col-md-6 col-sm-6 ">
                                            <input type="text" id="state" name="state" required="required" className="form-control" value={user.documentNumber} placeholder='Ingrese el documento'/>
                                        </Col>
                                </ColCenter>                           
                        </DivGroup>

                        <DivGroup className="form-horizontal " >  
                                <DivHeader className="form-horizontal " >
                                        <h5 style={{fontSize: '1.0rem', color: 'rgb(138 188 179)'}}>Datos personales </h5>
                                </DivHeader>
                                <ColCenter className="item form-group col-md-12 col-sm-12 row">
                                        <Col className="col-md-6 col-sm-6 ">
                                            <input type="text" id="state" name="state" required="required" className="form-control" value={user.lastName} placeholder='Apellido Paterno'/>
                                        </Col>
                                </ColCenter>   
                                <ColCenter className="item form-group col-md-12 col-sm-12 row">
                                        <Col className="col-md-6 col-sm-6 ">
                                            <input type="text" id="state" name="state" required="required" className="form-control" value={user.secondLastName} placeholder='Apellido Materno'/>
                                        </Col>
                                </ColCenter>  
                                <ColCenter className="item form-group col-md-12 col-sm-12 row">
                                        <Col className="col-md-6 col-sm-6 ">
                                            <input type="text" id="state" name="state" required="required" className="form-control" value={user.name} placeholder='Nombres'/>
                                        </Col>
                                </ColCenter>                          
                        </DivGroup>

                </div>
            </Gal>
            <Gal stepName={'step2'}>
                <DivGroup className="form-horizontal " >  
                    <DivHeader className="form-horizontal " >
                            <h5 style={{fontSize: '1.0rem', color: 'rgb(138 188 179)'}}>Selecciona el tipo de bono </h5>
                    </DivHeader>
                    <ColCenter className="item form-group col-md-12 col-sm-12 row">
                            <Col className="select-container col-md-6 col-sm-6 ">
                                <select className="form-control"  name="clientType" value={user.fundType} >
                                    {optionsAFP.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </Col>
                    </ColCenter>                          
                </DivGroup>
            </Gal>
            <Gal stepName={'step3'}>Step 3</Gal>
            <Gal stepName={'progress'}>progress</Gal>
            <Gal stepName={'step4'}>Step 4</Gal>
        </StepWizard>
      </CardPrincipal>  
      { (instance) && <InstanceDemo instance={instance} /> }
    </div>
  );



}
