const jwt = require('jsonwebtoken');

const secretKey = 'chave'; // Substitua por sua chave secreta real

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, authData) => {
      if (err) {
        res.sendStatus(403); // Token inválido
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(401); // Token não fornecido
  }
}

module.exports = verifyToken;