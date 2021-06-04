import axios from 'axios'
import {
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_LOGIN_SUCCESS,
  PATIENT_REGISTER_FAIL,
  PATIENT_REGISTER_REQUEST,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_UPDATE_PROFILE_FAIL,
  PATIENT_UPDATE_PROFILE_REQUEST,
  PATIENT_UPDATE_PROFILE_SUCCESS,
  PATIENT_DETAILS_RESET,
  PATIENT_LIST_FAIL,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_RESET,
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAIL,
  PATIENT_UPDATE_FAIL,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_REQUEST,
} from '../constants/patientConstants'
import { logout } from './userActions'



export const register = (name, email, MRno, age, dept) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      process.env.REACT_APP_DBB+'/api/patient',
      { name, email, MRno, age, dept },
      config
    )
    console.log(data)
    // return axios.post('/users', {
    //   name, email, password   }).then(user => {
    //           return user.data
    //       })
      
    dispatch({
      type: PATIENT_REGISTER_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: PATIENT_REGISTER_FAIL,
      payload: error
    })
  }
}

export const getPatientDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(process.env.REACT_APP_DBB+`/api/patient/${id}`, config)

    dispatch({
      type: PATIENT_DETAILS_SUCCESS,
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
      type: PATIENT_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updatePatientProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(process.env.REACT_APP_DBB+`/api/users/profile`, user, config)

    dispatch({
      type: PATIENT_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: PATIENT_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PATIENT_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}

export const listPatients = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(process.env.REACT_APP_DBB+`/api/patient`, config)

    dispatch({
      type: PATIENT_LIST_SUCCESS,
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
      type: PATIENT_LIST_FAIL,
      payload: message,
    })
  }
}

export const deletePatient = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(process.env.REACT_APP_DBB+`/api/patient/${id}`, config)

    dispatch({ type: PATIENT_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PATIENT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updatePatient = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_UPDATE_REQUEST,
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

    const { data } = await axios.put(process.env.REACT_APP_DBB+`/api/patient/${user._id}`, user, config)

    dispatch({ type: PATIENT_UPDATE_SUCCESS })

    dispatch({ type: PATIENT_DETAILS_SUCCESS, payload: data })

    dispatch({ type: PATIENT_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const updatePatientstatus = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_UPDATE_REQUEST,
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

    const { data } = await axios.put(process.env.REACT_APP_DBB+`/api/patient/${user._id}`, user, config)

    dispatch({ type: PATIENT_UPDATE_SUCCESS })

    dispatch({ type: PATIENT_DETAILS_SUCCESS, payload: data })

    dispatch({ type: PATIENT_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload: message,
    })
  }
}
