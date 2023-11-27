# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

### Run container
to start the container use:
1. `docker pull mikaldr/dat250-project-frontend:latest`
1. `docker run -e BACKEND_URL=http://backend-container-ip:8080 -p 80:80 mikaldr/dat250-project-frontend:latest`
   remember to set the backend_url to whatever you backend containers ip is.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
