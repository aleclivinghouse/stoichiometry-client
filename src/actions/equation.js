import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

import {saveAuthToken, clearAuthToken} from '../local-storage';

export const FETCH_EQUATIONS_REQUEST = 'FETCH_EQUATIONS_REQUEST';
export const fetchEquationsRequest = () => {
  return ({
    type: FETCH_EQUATIONS_REQUEST
  });
};

export const FETCH_EQUATIONS_SUCCESS = 'FETCH_EQUATIONS_SUCCESS';
export const fetchEquationsSuccess = (equations) => {
  return ({
    type: FETCH_EQUATIONS_SUCCESS,
    equations
  });
};

export const FETCH_EQUATIONS_ERROR = 'FETCH_CHEESES_ERROR';
export const fetchEquationsError = (error) => {
  return ({
    type: FETCH_EQUATIONS_ERROR,
     error
  });
};

export const ADD_EQUATION = 'ADD_EQUATION';
export const addEquation = (equation) => {
  return ({
    type: ADD_EQUATION,
    equation
  });
};


export const fetchEquations = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchEquationsRequest());
  fetch(`${API_BASE_URL}/equation`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => dispatch(fetchEquationsSuccess(res)))
  .catch(err => dispatch(fetchEquationsError(err)));
}

export const postEquation = (equation) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchEquationsRequest());
  fetch(`${API_BASE_URL}/equation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({equation})
  }).then(res => normalizeResponseErrors(res))
  .then(() => {
    dispatch(fetchEquations());})
  .catch(err => dispatch(fetchEquationsError(err)));
}

export const DELETE_EQUATION_SUCCESS = 'DELETE_EQUATION_SUCCESS';
export const deleteEquationSuccess = (id) => {
  return {
    type: DELETE_EQUATION_SUCCESS,
    id,
  };
}

export const deleteEquation = (id) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/equation/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${authToken}`
      }),
    }).then(response => response)
    .then(() => {
    dispatch(fetchEquations());})
    .catch(err => dispatch(fetchEquationsError(err)));
      // .then(id => dispatch(deleteEquationSuccess(id)));
}
