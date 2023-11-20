<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API

La API REST desarrollada hace validación de los datos, permite loguear los tiempos de respuesta y errores.
Incluye el uso de caché y uso de migraciones para la base de datos

En la rama `deploy` se hizo un DEPLOY de prueba con una versión prematura de la API usando postgres y Render. Puedes encontrar la aplicación [aquí](https://nest-postgres-5350.onrender.com/api/v1/students).

## `/api/v1/students`

#### `GET /api/v1/students`

Obtiene todos los estudiantes.

#### `GET /api/v1/students/:id`

Obtiene un estudiante por ID.

#### `POST /api/v1/students`

Crea un nuevo estudiante.

#### `PATCH /api/v1/students`

Actualiza la información del estudiante

**Ejemplo de cuerpo de solicitud:**

```json
{
  "firstname": "Andrea",
  "lastname": "Paucar",
  "email": "apa@mail.com"
}
```

## `/api/v1/teacher`

#### `GET /api/v1/teacher`

Obtiene todos los docentes.

#### `GET /api/v1/teacher/:id`

Obtiene la información del docente y sus cursos

#### `POST /api/v1/teacher`

Crea un nuevo docente.

**Ejemplo de cuerpo de solicitud:**

```json
{
  "fullname": "Flores"
}
```

## `/api/v1/subjects`

#### `GET /api/v1/subjects`

Obtiene todos los cursos.

#### `GET /api/v1/subjects/:id`

Obtiene la información del curso y quien lo dicta

#### `POST /api/v1/subjects`

Crea un nuevo curso.

#### `PATCH /api/v1/subjects`

Actualiza la información del docente

**Ejemplo de cuerpo de solicitud:**

```json
{
  "name": "DIP",
  "teacherId": "1"
}
```

## `/api/v1/enrollments`

#### `GET /api/v1/enrollments`

Obtiene todas las matrículas

#### `GET /api/v1/enrollments/:semester/:id` (/api/v1/enrollments/20232/2)

Obtiene la información de los cursos en el semestre del estudiante

#### `POST /api/v1/subjects`

Crea una nueva matrícula:

**Ejemplo de cuerpo de solicitud:**

```json
{
  "semester": "2023-1",
  "studentId": 1,
  "subjectsId": [1, 2, 3]
}
```
