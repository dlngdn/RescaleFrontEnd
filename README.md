# Rescale Front End Technical Challenge

This is the take home front end challenge for Rescale.

This project should take no longer than 3 hours. The intention of this project is to get a better understanding of your coding ability, your design sense, ux chops & your creativity. It's also intended to give you a better understanding of what we do at Rescale. The application that you will build is a simple version of Rescale's platform. Users will be able to select software simulations & hardware and to run jobs and get back results. If you are invited to come interview at our office we will use your project as a starting point for further discussion & we might ask you to add more functionality to what you have built. Due to time constraints, no testing is required at this stage.

Please create an application that uses the endpoints provided. Your application should be able to show the current jobs and their results and should be able to create a new job and show its results.  Please email any questions you may have to davidl at rescale.com.

Jobs Endpoint:

http://localhost:3000/api/jobs

This endpoint (GET) returns a JSON object with all of the current jobs in the application, there are 3 jobs each has a name an id, their software and hardware selections and their results

Individual Job Endpoint:

http://localhost:3000/api/jobs/:jobId

This endpoint (GET) returns a JSON object with the information for a particular job.


Software Endpoint:

http://localhost:3000/api/software

This endpoint (GET) returns a JSON object with options for software/simulation. There are three top level choices of Computational Fluid Dynamics, Structural Analysis & Electromagnetics. Each selection includes several applications such as Aircraft Icing, Turbulence Modeling or Thermal Analysis.

Hardware Endpoint:

http://localhost:3000/api/hardware

This endpoint (GET) returns a JSON object with options for hardware. There are three hardware selections and each shows the options of how many cores are available.

Create New Job Endpoint:

http://localhost:3000/api/create

This endpoint (POST) allows you to create a new job. To create a new job you should post with data in the following format:

{
  'name': 'New Job Name',
  'softwareId': 'cfd',
  'applicationId': 'icing',
  'hardwareId': 'e4',
  'cores': 32,
}

After cloning the repository on your local machine run: 'npm install'

To get the api server and the dev server running at the same time please run:

'npm run api-server'

&

'npm run dev-server'

The api server runs on http://localhost:3000/api/

& the dev server runs on http://localhost:8080/

I've provided a basic boilerplate for React, but feel free to use whatever framework you feel comfortable with.

Good Luck!

-David
