import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getPatientDetails, updatePatient} from '../actions/patientActions'
import { PATIENT_UPDATE_RESET } from '../constants/patientConstants'

const PatientEditScreen = ({ match, history }) => {
  const patientId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [MRno, setMRno] = useState('')
  const [age, setage] = useState('')
  const [deptList] = useState(['General', 'Radiology', 'Medical Store'])
 const [dept, setdept] = useState('')
  const [userID, setuserID] = useState({})

  const dispatch = useDispatch()

  const patientDetails = useSelector((state) => state.patientDetails)
  const { loading, error, patient } = patientDetails

  const patientUpdate = useSelector((state) => state.patientUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = patientUpdate

  useEffect(() => {
    localStorage.getItem('userInfo')
       if (successUpdate) {
      dispatch({ type: PATIENT_UPDATE_RESET })
      history.push('/admin/patientlist')
    } else {
      if (!patient.name || patient._id !== patientId) {
        dispatch(getPatientDetails(patientId))
      } else {
        setName(patient.name)
        setage(patient.age)
        setdept(patient.dept)
        setMRno(patient.MRno)
           }
    }
  }, [dispatch, history, patientId, patient, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
        updatePatient({
        _id: patientId,
        name,
        age,
        MRno,
        dept
      })
    )
  }

  return (
    <>
      <Link to='/admin/patientList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Patient Record</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group controlId='price'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={age}
                onChange={(e) => setage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='MrNo'>
              <Form.Label>MR#</Form.Label>
              <Form.Control
                type='text'
                value={MRno}
                onChange={(e) => setMRno(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Dept</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={dept}
                onChange={(e) => setdept(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PatientEditScreen
