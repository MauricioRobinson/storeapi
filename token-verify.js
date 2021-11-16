const jwt = require('jsonwebtoken');
const secret = 'myCat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNzA3NDkyMX0.AN-i-g1I-S4IqVjUlemQ6X9JNN4dV8krXLjhvQbh4FE';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
