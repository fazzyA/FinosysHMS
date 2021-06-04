import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listTR, deleteTR } from '../actions/transactionActions'

const TransactionListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const transactionList = useSelector((state) => {
        console.log(state)
        return state.transactionList
    })
    const { transaction } = transactionList
    const patientarr = []
    const transactionDelete = useSelector((state) => state.transactionDelete)
    const { success: successDelete } = transactionDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listTR())

        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        console.log(id)
        if (window.confirm('Are you sure')) {
            dispatch(deleteTR(id))
        }
    }

    return (
        <>
            <h1>Patient's Transactions</h1>
            <Row>
                <LinkContainer to='/patientform'>
                <Nav.Link>
                    <i className='fas fa-user'></i> Submit Patient Info
                  </Nav.Link>
                </LinkContainer>
        </Row>
      {
        loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>MR#</th>
                        <th>Dept</th>
                        <th>Service</th>
                        <th>Condition</th>
                        <th>Dr.</th>
                        <th>Notes</th>
                        <th>Tests</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {transaction ? transaction.map((pitem) => (
                        <tr key={pitem._id}>
                            <td>{pitem._id}</td>
                            <td>{pitem.MRno}</td>
                            <td>{pitem.dept}</td>
                            <td>{pitem.service}</td>
                            <td>{pitem.condition}</td>
                            <td>{pitem.drReffered}</td>
                            <td>{pitem.notes}</td>
                            <td>{pitem.tests}</td>
                            <td>
                                {/* <LinkContainer to={`/admin/Patient/${pitem._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer> */}
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(pitem._id)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    )) : []}
                </tbody>
            </Table>
        )
    }
    </>
  )
}

export default TransactionListScreen
