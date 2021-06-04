import {
  TR_DETAILS_FAIL,
  TR_DETAILS_REQUEST,
  TR_DETAILS_RESET,
  TR_DETAILS_SUCCESS,
  TR_LIST_REQUEST,
  TR_LIST_SUCCESS,
  TR_LIST_FAIL,
  TR_LIST_RESET,
  TR_DELETE_REQUEST,
  TR_DELETE_SUCCESS,
  TR_DELETE_FAIL,
  TR_UPDATE_RESET,
  TR_UPDATE_REQUEST,
  TR_UPDATE_SUCCESS,
  TR_UPDATE_FAIL,
  TR_REGISTER_REQUEST,
  TR_REGISTER_SUCCESS,
  TR_REGISTER_FAIL   
} from '../constants/transactionConstants'



export const transactionRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TR_REGISTER_REQUEST:
      return { loading: true }
    case TR_REGISTER_SUCCESS:
      return { loading: false, transaction: action.payload }
    case TR_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const transactionDetailsReducer = (state = { transactionDetail: {} }, action) => {
  switch (action.type) {
    case TR_DETAILS_REQUEST:
      return { ...state, loading: true }
    case TR_DETAILS_SUCCESS:
      return { loading: false, patient: action.payload }
    case TR_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case TR_DETAILS_RESET:
      return { patient: {} }
    default:
      return state
  }
}



export const transactionListReducer = (state = { transaction: [] }, action) => {
  switch (action.type) {
    case TR_LIST_REQUEST:
      return { loading: true }
    case TR_LIST_SUCCESS:
      return { loading: false, transaction: action.payload }
    case TR_LIST_FAIL:
      return { loading: false, error: action.payload }
    case TR_LIST_RESET:
      return { transaction: [] }
    default:
      return state
  }
}

export const transactionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TR_DELETE_REQUEST:
      return { loading: true }
    case TR_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TR_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const transactionUpdateReducer = (state = { transaction: [] }, action) => {
  switch (action.type) {
    case TR_UPDATE_REQUEST:
      return { loading: true }
    case TR_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case TR_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case TR_UPDATE_RESET:
      return {
        transaction: [],
      }
    default:
      return state
  }
}
