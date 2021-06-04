import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getPatientMR } from '../actions/patientActions'
import { createTr } from '../actions/transactionActions'
import Meta from '../components/Meta'

const PatientInfoScreen = ({ location, history }) => {
  const [message, setMessage] = useState(null)
  const [pid, setpid] = useState('')
  const [dept] = useState('Radiology')
  const [conditionList] = useState(["please select",'Critical', 'Normal', 'Only test'])
  const [serviceList] = useState(["please select",'Xray', 'MRI', 'Chemo'])
  const [drReffered, setdrReffered] = useState('')
  const [notes, setnotes] = useState('')
  const [tests, settests] = useState('')
  const [condition, setcon] = useState('')
  const [MRno, setMRno] = useState('')
  const [service, setservice] = useState('')
  const dispatch = useDispatch()
// console.log('......',pid)
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const patientMR = useSelector((state) => {
    return state.patientMR})
  const { patientMRs, error, loading } = patientMR

  useEffect(() => {
    if (!userInfo) {
        history.push('/login')
      }
      dispatch(getPatientMR()) 

    }, [history, userInfo, redirect,dispatch])


  const submitHandler = (e) => {
    e.preventDefault()
         console.log({pid,service,tests,MRno,condition,dept,drReffered,notes})
    dispatch(createTr(pid,service,tests,MRno,condition,dept,drReffered,notes))
    //redirect to patient lists
     history.push('/admin/transactionlist')
  }
const setPidMR =(val)=>{
   const splitVal = val.split('.');
    console.log(splitVal)
    setpid(splitVal[0])
    setMRno(splitVal[1])

}
  return (
    <>
    <Meta title='Patient Registration'/>
    <FormContainer>
      <h1>Register Patient</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        
        <Form.Group controlId='MRno'>
          <Form.Label>Patient MR#</Form.Label>
          <Form.Control as="select"  onChange={(e) => {
              setPidMR(e.target.value)
            }}>
            <option value=''>please select patient</option>
            {patientMRs ? patientMRs.map((itm)=>(
            <option key={itm._id} value={`${itm._id}.${itm.MRno}`}>
                {itm.MRno}</option>
            )) : []}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='dept'>
          <Form.Label>Department</Form.Label>
          <Form.Control
            type='name'
            value='Radiology'
            // onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='service'>
          <Form.Label>Service</Form.Label>
          <Form.Control as="select" value={service} 
          onChange={(e) => setservice(e.target.value)}>
            {serviceList.map((item,ind)=>(
            <option key={ind}>{item}</option>
            ))}
          </Form.Control>
        </Form.Group>


        <Form.Group controlId='drReffered'>
          <Form.Label>Dr Name</Form.Label>
          <Form.Control
            type='text'
            value={drReffered}
            onChange={(e) => setdrReffered(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='Tests'>
          <Form.Label>Tests Details</Form.Label>
          <Form.Control
            type='text'
            placeholder='Tests Details'
            value={tests}
            onChange={(e) => settests(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='notes'>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type='text'
            value={notes}
            onChange={(e) => setnotes(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='condition'>
          <Form.Label>Patient Condition</Form.Label>
          <Form.Control as="select" value={condition} onChange={(e) => setcon(e.target.value)}>
            {conditionList.map((item,ind)=>(
            <option key={ind}>{item}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </>
  )
}

export default PatientInfoScreen
