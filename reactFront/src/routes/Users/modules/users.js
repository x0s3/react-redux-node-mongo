/**
 * Created by root on 26/05/17.
 */
import axios from 'axios';
// ------------------------------------
// Constants
// ------------------------------------
export const SHOW_USERS = 'SHOW_USERS';
export const CREATE_EXCEL = 'CREATE_EXCEL';
export const DELETE_USER = 'DELETE_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
// ------------------------------------
// Actions
// ------------------------------------
export const getUsers = () => (dispatch) => {
  axios.get("http://localhost:3001/users").then((responseData) => {
    const {data, status, headers} = responseData;
    dispatch(showUsers(data));
  });
};

export const createUser = (req) => (dispatch) => {
  axios.post('http://localhost:3001/users', req).then((responseData) => {
    const {data, status, headers} = responseData;
    console.log(data);
    if (status === 201)
      dispatch({
        type: CREATE_USER,
        payload: data
      })
  });
};

export const updateUser = (req) => (dispatch) => {
  axios.put('http://localhost:3001/users/' + req._id,req).then((responseData) => {
    const {data, status, headers} = responseData;
    if (status === 200)
      dispatch({
        type: UPDATE_USER,
        payload: data
      });
  });
};

export const deleteUser = (id) => (dispatch) => {
  axios.delete('http://localhost:3001/users/' + id).then((responseData) => {
    const {data, status, headers} = responseData;
    console.log(status);
    if (status === 204)
      dispatch({
        type: DELETE_USER,
        payload: id
      });
  });
};

export const createExcel = () => (dispatch) => {
  axios.get('http://localhost:3001/users/excel').then((responseData) => {
    const {data, status, headers} = responseData;
    if (status === 200)
      dispatch({
        type: CREATE_EXCEL,
        payload: status
      });
  });
};

export function showUsers(value = []) {
  return {type: SHOW_USERS, payload: value};
}

export const actions = {
  getUsers,
  showUsers,
  createExcel,
  deleteUser,
  createUser,
  updateUser
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHOW_USERS]: (state, action) => {
    return Object.assign({}, state, {usuarios: action.payload});
  },
  [CREATE_EXCEL]: (state, action) => {
    return Object.assign({}, state, {mess: action.payload});
  },
  [DELETE_USER]: (state, action) => {
    let usuarios = state.usuarios.filter((usuarioActual) => {
      if (usuarioActual._id !== action.payload)
        return usuarioActual;
    });
    return Object.assign({}, state, {usuarios});
  },
  [CREATE_USER]: (state, action) => {
    state.usuarios.push(action.payload);
    return state;
  },
  [UPDATE_USER]: (state, action) => {
    for(let x=0;x<state.usuarios.length;x++){
      if(state.usuarios[x]._id === action.payload._id){
        state.usuarios[x].nombre = action.payload.nombre;
        state.usuarios[x].edad = action.payload.edad;
        state.usuarios[x].altura = action.payload.altura;
        state.usuarios[x].sexo = action.payload.sexo;
      }
    }
    return state;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {usuarios: []};

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
