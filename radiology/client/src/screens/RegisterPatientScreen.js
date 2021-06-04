import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/patientActions'
import Meta from '../components/Meta'

const RegisterPatientScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [MRno, setMRno] = useState('')
  const [age, setage] = useState('')
  const [deptList] = useState(['General', 'Radiology', 'Medical Store'])
 const [dept, setdept] = useState('')
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    // if (password !== confirmPassword) {
    //   setMessage('Passwords do not match')
    // } else {
    dispatch(register(name, email, MRno, age, dept))
    //redirect to patient lists
    history.push('/admin/patientlist')
    //  }
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
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>


        {/* <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

        {/* <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group> */}
        <Form.Group controlId='MRno'>
          <Form.Label>MR No.</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter MRno'
            value={MRno}
            onChange={(e) => setMRno(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='age'>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter age'
            value={age}
            onChange={(e) => setage(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='Dept'>
          <Form.Label>Dept.</Form.Label>
          <Form.Control as="select" value={dept} onChange={(e) => setdept(e.target.value)}>
            {deptList.map((item,ind)=>(
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

export default RegisterPatientScreen
