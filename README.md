# Frontend
This is the frontend of our Dat250 project, fall 2023.

The back-end can be found at: [https://github.com/Thomas-Johansen/dat250Project](https://github.com/Thomas-Johansen/dat250Project)

---
### Deploy the application.
[![FeedApp Image build](../../actions/workflows/docker-build.yml/badge.svg)](../../actions/workflows/docker-build.yml)

The frontend application is deployable using docker. Following the commands below you can run the application.

to start the container use:
1. `docker pull mikaldr/dat250-project-frontend:latest`
2. `docker run -d -p 80:80 mikaldr/dat250-project-frontend:latest`

Your frontend should now be running at your http://localhost:80. If you have also
deployed [back-end](https://github.com/Thomas-Johansen/dat250Project), the site itself should be operational

NB! the frontend expects you to run the backend on the same computer, as the container looks for the backend using
the host computers localhost:8080

---
### Running the test server
You will need to have Node.js and Angular installed in order to run the test server for the application.
To run the test server. use the command:
`ng serve ng serve --proxy-config proxy.conf.json`

This should create a local instance of the test server running on you computer. You will also need to start the [back-end](https://github.com/Thomas-Johansen/dat250Project) in order to
use the application properly

---
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.
