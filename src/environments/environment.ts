const host = 'ec2-54-161-52-11.compute-1.amazonaws.com';
const port = '3000';

export const environment = {
  production: false,
  baseUrl: `http://${host}:${port}/`
};
