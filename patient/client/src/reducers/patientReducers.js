import {
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_RESET,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_LIST_RESET,
  PATIENT_LOGIN_FAIL,
  PATIENT_LOGIN_REQUEST,
  PATIENT_LOGIN_SUCCESS,
  PATIENT_LOGOUT,
  PATIENT_REGISTER_FAIL,
  PATIENT_REGISTER_REQUEST,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_UPDATE_PROFILE_FAIL,
  PATIENT_UPDATE_PROFILE_REQUEST,
  PATIENT_UPDATE_PROFILE_SUCCESS,
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAIL,
  PATIENT_UPDATE_RESET,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_UPDATE_PROFILE_RESET,
} from '../constants/patientConstants'

export const patientRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_REGISTER_REQUEST:
      return { loading: true }
    case PATIENT_REGISTER_SUCCESS:
      return { loading: false, patient: action.payload }
    case PATIENT_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientDetailsReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PATIENT_DETAILS_SUCCESS:
      return { loading: false, patient: action.payload }
    case PATIENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PATIENT_DETAILS_RESET:
      return { patient: {} }
    default:
      return state
  }
}

export const patientUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case PATIENT_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, patientInfo: action.payload }
    case PATIENT_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case PATIENT_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const patientListReducer = (state = { patient: [] }, action) => {
  switch (action.type) {
    case PATIENT_LIST_REQUEST:
      return { loading: true }
    case PATIENT_LIST_SUCCESS:
      console.log(action.payload)
      return { loading: false, patient: action.payload }
    case PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    case PATIENT_LIST_RESET:
      return { patient: [] }
    default:
      return state
  }
}

export const patientDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_DELETE_REQUEST:
      return { loading: true }
    case PATIENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PATIENT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientUpdateReducer = (state = { patient: [] }, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_REQUEST:
      return { loading: true }
    case PATIENT_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case PATIENT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PATIENT_UPDATE_RESET:
      return {
        patient: [],
      }
    default:
      return state
  }
}
