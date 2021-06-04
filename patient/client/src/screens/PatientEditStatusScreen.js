import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getPatientDetails, updatePatient, updatePatientstatus } from '../actions/patientActions'
import { PATIENT_UPDATE_RESET } from '../constants/patientConstants'

const PatientEditStatusScreen = ({ match, history }) => {
    const patientId = match.params.id
    const [message, setMessage] = useState(null)
    const [MRno, setMRno] = useState('')
    const [statusList] = useState(['Out Patient', 'Admitted', 'Recovered', 'Discharged', 'Expired'])
    const [status, setstatus] = useState('')
    const [userID, setuserID] = useState({})

    const dispatch = useDispatch()

    const patientDetails = useSelector((state) => {
        console.log(state)
        return state.patientDetails
    })
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
                setstatus(patient.status)
                setMRno(patient.MRno)
            }
        }
    }, [dispatch, history, patientId, patient, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updatePatientstatus({
                _id: patientId,
                status,
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

                        <Form.Label>Current Status: {status} </Form.Label>
                        <Form.Group controlId='status'>
                            <Form.Label>Patient MR #: {patient.MRno}</Form.Label>
                            <Form.Control as="select" value={status}
                                onChange={(e) => setstatus(e.target.value)}>
                                {statusList.map((item, ind) => (
                                    <option key={ind}>{item}</option>
                                ))}
                            </Form.Control>
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

export default PatientEditStatusScreen
