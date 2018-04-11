import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api';

export const GET_SOFTWARE = 'GET_SOFTWARE';
export const GET_HARDWARE = 'GET_HARDWARE';
export const GET_JOBS = 'GET_JOBS';
export const GET_SPECIFIC_JOB = 'GET_SPECIFIC_JOB';
export const CREATE_JOB = 'CREATE_JOB';

//makes a request to get software options
export function getSoftware() {
  const request = axios.get(`${ROOT_URL}/software`);
  return {
    type: GET_SOFTWARE,
    payload: request
  }
}

//makes a request to get hardware options
export function getHardware() {
  const request = axios.get(`${ROOT_URL}/hardware`);
  return {
    type: GET_HARDWARE,
    payload: request
  }
}

//makes a request to get list of jobs
export function getJobs() {
  const request = axios.get(`${ROOT_URL}/jobs`);
  return {
    type: GET_JOBS,
    payload: request
  }
}

//creates a new job
export function createJob(data) {
  var params = new URLSearchParams();
  const request = axios.post(`${ROOT_URL}/create`, data);
  return {
    type: CREATE_JOB,
    payload: request
  }
}
