import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSoftware, getHardware, getJobs, createJob } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.createJob = this.createJob.bind(this);
    this.getSoftware = this.getSoftware.bind(this);
    this.getHardware = this.getHardware.bind(this);
    this.getJobs = this.getJobs.bind(this);
  }
  
  createJob() {
    const data = {
      'name': 'Newly Created Job',
      'softwareId': 'cfd',
      'applicationId': 'icing',
      'hardwareId': 'e4',
      'cores': 32,
    }
    this.props.createJob(data)
  }

  getSoftware() {
    this.props.getSoftware()
  }

  getHardware() {
    this.props.getHardware()
  }

  getJobs() {
    this.props.getJobs()
  }

  render() {
    console.log("props");
    console.log(this.props);
    if(this.props.hardware.length > 0 ){
      console.log("hardware");
      console.log(this.props.hardware);
    }
    if(this.props.software.length > 0 ){
      console.log("software");
      console.log(this.props.software);
    }
    if(this.props.jobs.length > 0 ){
      console.log("jobs");
      console.log(this.props.jobs);
    }
    return (
      <div className="fe-app">
        <div>
          <button onClick={this.createJob} className="regular-button">
            Create Job
          </button>
          <button onClick={this.getSoftware} className="regular-button">
            Get Software
          </button>
          <button onClick={this.getHardware} className="regular-button">
            Get Hardware
          </button>
          <button onClick={this.getJobs} className="regular-button">
            Get Jobs
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ software, hardware, jobs }){
  return { software, hardware, jobs };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getSoftware, getHardware,
    getJobs, createJob }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
