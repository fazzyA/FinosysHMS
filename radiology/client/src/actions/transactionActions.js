import axios from 'axios'
import {
    TR_REGISTER_REQUEST,
    TR_REGISTER_SUCCESS,
    TR_REGISTER_FAIL,
    TR_LIST_REQUEST,
    TR_LIST_SUCCESS,
    TR_LIST_FAIL,
    TR_LIST_RESET,
    TR_DELETE_REQUEST,
    TR_DELETE_SUCCESS,
    TR_DELETE_FAIL,
    TR_UPDATE_REQUEST,
    TR_UPDATE_SUCCESS,
    TR_UPDATE_FAIL,
    TR_UPDATE_RESET,
    TR_DETAILS_REQUEST,
    TR_DETAILS_SUCCESS,
    TR_DETAILS_FAIL,
    TR_DETAILS_RESET
} from '../constants/transactionConstants'
import { logout } from './userActions'




export const createTr = (pid, service, tests, MRno, condition, dept, drReffered, notes) => async (dispatch) => {
    try {
        dispatch({
            type: TR_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

         // create transaction in radiology dept and in patient db
         const { data } = await axios.post(
            process.env.REACT_APP_DB_PATIENT + '/api/transaction/',
            { pid, service, tests, MRno, condition, dept, drReffered, notes },
            config
        )
        console.log(data)
        const res = await axios.post(
            process.env.REACT_APP_DB_TR + `/api/transaction`, 
            { pid, service, tests, MRno, condition, dept, drReffered, notes },
            config)
            console.log(res)

        dispatch({
            type: TR_REGISTER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TR_REGISTER_FAIL,
            payload: error
        })
    }
}

export const getTRDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TR_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(process.env.REACT_APP_DB_PATIENT + `/api/transaction/${id}`, config)

        dispatch({
            type: TR_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TR_DETAILS_FAIL,
            payload: message,
        })
    }
}



export const listTR = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: TR_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(process.env.REACT_APP_DB_PATIENT + `/api/transaction`, config)

        dispatch({
            type: TR_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TR_LIST_FAIL,
            payload: message,
        })
    }
}

export const deleteTR = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TR_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(process.env.REACT_APP_DB_PATIENT + `/api/transaction/${id}`, config)

        dispatch({ type: TR_DELETE_SUCCESS })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TR_DELETE_FAIL,
            payload: message,
        })
    }
}

export const updateTR = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TR_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(process.env.REACT_APP_DB_PATIENT + `/api/transaction/${user._id}`, user, config)

        dispatch({ type: TR_UPDATE_SUCCESS })

        dispatch({ type: TR_DETAILS_SUCCESS, payload: data })

        dispatch({ type: TR_DETAILS_RESET })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TR_UPDATE_FAIL,
            payload: message,
        })
    }
}
