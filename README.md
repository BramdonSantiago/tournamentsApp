Para comenzar el proyecto conseguir la version 22 (22.10.0) del node https://nodejs.org/en/

Y el CLI de Angular con 
```bash
npm install -g @angular/cli@latest
```

Instalar dependencias con
```bash
npm install
```

Y luego iniciar la app con
```bash
ng serve
```

La aplicación es una app de torneos, en la cual se puede crear, editar o eliminar los torneos.
Funciona por medio del localStorage para hacer el almacenamiento de los datos.

La app permite cargar una imagen representativa del torneo, la cual se almacena de forma segura en una plataforma de gestión de medios configurada previamente, optimizando su entrega y accesibilidad.

Es un proyecto Angular 19.

# TournamentsApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
