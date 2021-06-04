import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listPatients, deletePatient } from '../actions/patientActions'

const PatientListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const patientList = useSelector((state) => state.patientList)
  const { patient } = patientList
console.log(patient)
const patientarr= []
  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
       dispatch(listPatients())
     
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePatient(id))
    }
  }

  return (
    <>
      <h1>Patients</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Sno</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>MR#</th>
              <th>Dept</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patient ? patient.map((pitem) => (
              <tr key={pitem._id}>
                <td>{pitem._id}</td>
                <td>{pitem.name}</td>
                <td>
                  <a href={`mailto:${pitem.email}`}>{pitem.email}</a>
                </td>
                <td>
                  {pitem.MRno}
                </td>
                <td>
                  {pitem.dept}
                </td>
                <td>
                  {/* <LinkContainer to={`/admin/Patient/${pitem._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(pitem._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button> */}
                </td>
              </tr>
            )) : []}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default PatientListScreen
