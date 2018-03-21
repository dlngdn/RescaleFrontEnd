var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var shortid = require('shortid')
var util = require('util');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.PORT || 3000

var router = express.Router()

// Unsafely enable cors
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// logging middleware
router.use(function(req, res, next) {
    console.log('\nReceived:',{url: req.originalUrl, body: req.body, query: req.query})
    next()
})


// Simple in memory database
const jobs = [
  { name: 'Chair Structural Test', id: 'rJK69pItf', software: {type: {label: 'Structural Analysis', id: 'structural'}, application: {label: 'Strength Analysis', id: 'strength'}}, hardware: {type: {label: 'Intel Xeon E4-1676  @ 2.3 GHz', id: 'e4'}, cores: 32 }, results: { duration: 16, images: ['img1', 'img2', 'img3']}},
  { name: 'Watch Interference Test', id: 'BJxY6cTUKM', software: {type: {label: 'Electromagnetics', id: 'electromagnetics'}, application: {label: 'Radio Frequency Interference', id: 'interference'}}, hardware: {type: {label: 'Intel Xeon Platinum 8168', id: 'platinum'}, cores: 64 }, results: { duration: 8, images: ['img1', 'img2', 'img3']}},
  { name: 'Helmet Turbulence Test', id: 'H1ZKaqTLFf', software: {type: {label: 'Computational Fluid Dynamics', id: 'cfd'}, application: {label: 'Turbulence Modeling', id: 'turbulence'}}, hardware: {type: {label: 'Intel Xeon E5-2667 @ 2.7 GHz', id: 'e5'}, cores: 32 }, results: { duration: 12, images: ['img1', 'img2', 'img3']}},
]

const software = [
  { label: 'Computational Fluid Dynamics', id: 'cfd', image:'path', applications: [{label: 'Aircraft Icing', id: 'icing', image: "path"}, {label: 'Turbomachinery', id: 'turbomachinery', image: 'path'}, {label: 'Turbulence Modeling', id: 'turbulence', image: 'path'} ]},
  { label: 'Structural Analysis', id: 'structural', image:'path', applications: [{label: 'Strength Analysis', id: 'strength', image: "path"}, {label: 'Thermal Analysis', id: 'thermal', image: 'path'}, {label: 'Impact', id: 'impact', image: 'path'} ]},
  { label: 'Electromagnetics', id: 'electromagnetics', image:'path', applications: [{label: 'Radio Frequency Interference', id: 'radio', image: "path"}, {label: 'Electronics Cooling', id: 'cooling', image: 'path'} ]},
]

const hardware = [
  { label: 'Intel Xeon E4-1676  @ 2.3 GHz', id: 'e4', image:'path', max: 32 },
  { label: 'Intel Xeon E5-2667 @ 2.7 GHz', id: 'e5', image:'path', max: 32 },
  { label: 'Intel Xeon Platinum 8168 @ 3.2 GHz', id: 'platinum', image:'path', max: 64 },
]

const results = {
  cfd: {
    icing: {images: ['icing', 'img2', 'img3']},
    turbomachinery: {images: ['turbomachinery', 'img2', 'img3']},
    turbulence: {images: ['turbulence', 'img2', 'img3']}
  },
  structural: {
    strength: {images: ['strength', 'img2', 'img3']},
    thermal: {images: ['thermal', 'img2', 'img3']},
    impact: {images: ['impact', 'img2', 'img3']},
  },
  electromagnetics: {
    radio: {images: ['radio', 'img2', 'img3']},
    cooling: {images: ['cooling', 'img2', 'img3']},
  }
}


// Utility functions
const findJob = (jobId) => {
  const job = jobs.find((job) => {
    return job.id === jobId
  })
  if (job === undefined){
    return {error: `A job with id ${jobId} does not exist`}
  }
  return job
}

const findJobIndex = (jobId) => {
  const jobIndex = jobs.findIndex((job) => {
    return job.id === jobId
  })
  return jobIndex
}

const getSoftware = (softwareId) => {
  const newSoftware = software.find((sw)=>{
    return sw.id === softwareId;
  });
  if (newSoftware === undefined) {
    return {error: `A software with id ${softwareId} does not exist`}
  }
  const { label, id, applications } = newSoftware;
  const softwareObj = {
    label,
    id,
    applications
  }
  return softwareObj;
}

const getApplication = (applications, applicationId) => {
  console.log(applications);
  const newApplication = applications.find((app)=>{
    return app.id === applicationId;
  });
  if (newApplication === undefined) {
    return {error: `An application with id ${applicationId} does not exist (at least not for the selected software)`}
  }
  const { label, id } = newApplication;
  const applicationObj = {
    label,
    id,
  }
  return applicationObj;
}

const getHardware = (hardwareId, cores) => {
  const newHardware = hardware.find((hw)=>{
    return hw.id === hardwareId;
  });
  if (newHardware === undefined) {
    return {error: `A hardware with id ${hardwareId} does not exist`}
  }
  const { type } = newHardware;
  const hardwareObj = {
    type,
    cores,
  }
  return hardwareObj;
}

const getNewJobName = (data) => {
  console.log("getNewJobName");

  console.log('connection : %j', data);
  const name = data.name;
  if (name === undefined){
    return {error: `No name is defined for new job`}
  }
  return name;
}

const getNewSoftware = (data) => {
  const softwareId = data['softwareId'];
  if (softwareId === undefined){
    return {error: `softwareId is either incorrect or missing for new job`}
  }
  const software = getSoftware(softwareId);
  if (software.error){
    return {error: software.error}
  }
  return software;
}

const getNewApplication = (applications, data) => {
  const applicationId = data['applicationId'];
  if (applicationId === undefined){
    return {error: `No applicationId is define for new job`}
  }
  const application = getApplication(applications, applicationId);
  if (application.error){
    return {error: application.error}
  }
  return application;
}

const getNewHardware = (data) => {
  const hardwareId = data['hardwareId'];
  if (hardwareId === undefined){
    return {error: `hardwareId is either incorrect or missing for new job`}
  }
  const cores = data['cores'];
  if (cores === undefined){
    return {error: `cores is either incorrect or missing for new job`}
  }
  const hardware = getHardware(hardwareId, cores);
  if (hardware.error){
    return {error: hardware.error}
  }
  return hardware;
}

const getDelay = (hardwareCores) => {
  const total = Math.floor(Math.random() * (90000 - 70000 + 1)) + 70000;
  return total - (hardwareCores*1000);
}

const getNewResults = (softwareId, applicationId, duration) => {
  const images = results[softwareId][applicationId];
  if(images === undefined){
    return {error: `applicationId ${applicationId} does not exist for ${softwareId}`}
  }
  const resultsObject = {
    duration,
    images
  }
  return resultsObject;
}

// API Routes

//Software endpoint
router.get('/software', function(req, res) {
  console.log('Response:', software)
  res.json({options: software})
})

//Hardware endpoint
router.get('/hardware', function(req, res) {
  console.log('Response:', hardware)
  res.json({options: hardware})
})

//Jobs endpoint
router.get('/jobs', function(req, res) {
  console.log('Response:', jobs)
  res.json({jobs: jobs})
})

//Job by id endpoint
router.get('/jobs/:jobId', function(req, res) {
  console.log(req);
  job = findJob(req.params.jobId)
  if (job.error) {
    console.log('Response:',job)
    res.json(job)
  } else {
    console.log('Response:',{label: job.name, id: job.id, software: job.software, hardware: job.hardware, results: job.results})
    res.json({label: job.name, id: job.id, software: job.software, hardware: job.hardware, results: job.results})
  }
})

const reqBody = {
  name: "newName",
  softwareId: 'cfd',
  applicationId: 'strength',
  hardwareId: 'e4',
  cores: 32,
}

//Create job endpoint
router.route('/create')
  .post(function(req, res) {
    console.log('Request:',{req: req.body})
    const jobId = shortid.generate();
    const name = getNewJobName(req.body);
    const software = getNewSoftware(req.body);
    if(name.error) {
      console.log('Response:',{error: name.error})
      return res.json(name);
    }
    if(software.error) {
      console.log('Response:',{error: software.error})
      return res.json(software);
    }
    const application = getNewApplication(software.applications, req.body);
    if(application.error) {
      console.log('Response:',{error: application.error})
      return res.json(application);
    }
    const hardware = getNewHardware(req.body);
    if(hardware.error) {
      console.log('Response:',{error: hardware.error})
      return res.json(hardware);
    }
    const delay = getDelay(hardware.cores);
    const results = getNewResults(software.id, application.id, delay)
    if(results.error) {
      console.log('Response:',{error: results.error})
      return res.json(results);
    }
    const job = {
      name,
      id: jobId,
      software: {
        label: software.label,
        id: software.id,
        application: application,
      },
      hardware: {
        type: hardware.type,
        cores: hardware.cores,
      },
      results: "job in progress..."
    }
    jobs.push(job);
    console.log('Response:',job)
    res.json(job);
  })

app.use('/api', router)
app.listen(port)
console.log(`API running at localhost:${port}/api`)
