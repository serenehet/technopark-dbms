const promise = require('bluebird');
const pgp = require('pg-promise')({promiseLib: promise});

const local = 'postgres://postgres:postgres@localhost:5432/postgres';
const docker = 'postgres://docker:docker@localhost:5432/docker';

export const db = pgp(docker);
