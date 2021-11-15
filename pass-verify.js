const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$MS3ebZ0cVUqENnzhxM.l2eCX7BI/nV37O0T/QIn2zrdUGsit8NsYm';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
