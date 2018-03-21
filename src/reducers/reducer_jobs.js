import {
  GET_JOBS,
  GET_SPECIFIC_JOB,
  CREATE_JOB,
} from '../actions/index';

//reducer to get or post jobs
export default function( state = [], action) {
  switch (action.type) {
    case GET_JOBS:
      return action.payload.data.jobs;
    case GET_SPECIFIC_JOB:
      return action.payload.data.jobs;
    case CREATE_JOB:
      return [...state, action.payload.data];
    default:
      return state;
  }
}
