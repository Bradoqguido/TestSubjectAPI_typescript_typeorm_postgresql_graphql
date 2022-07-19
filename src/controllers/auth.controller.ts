const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// ==> Método responsável por criar um novo 'Login':
exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { rows } = await db.query("SELECT idperson, name, photourl, password FROM PUBLIC.PERSON WHERE EMAIL LIKE '" + email + "';");

      // If user not exists
      if (rows.length <= 0) {
        res.status(204).send();
        return;
      }
        
      // Compare the password (digited and saved) with promisse
      bcrypt.compare(password, rows[0].password).then(match => {
        if(!match)
          return res.status(400).send({ error: 'Invalid password!'});

        // Create a JWT token with user id and the secret
        const token = jwt.sign({ id: rows[0].idperson }, config.secret, {
          expiresIn: 86400,
        });

        return res.status(200).send({ idperson: rows[0].idperson, name: rows[0].name, photourl: rows[0].photourl, email, auth: true, token });
      });

    } catch (error) {
      return res.status(400).send({ error: 'Authentication failed!'});
    }
}

exports.logout = (req, res) => {
    res.status(200).json({auth: false, token: null});
}

exports.register = async (req, res) => {
  const { username, email, password, photourl, provideruid, providername } = req.body;
  try {
    const { rows } = await db.query("SELECT idperson FROM PUBLIC.PERSON WHERE EMAIL LIKE '" + email +"';");

    // If user exists
    if (rows.length > 0)
      return res.status(200).send({ message: 'User already exists' });

    const encryptedPassword = await bcrypt.hash(password, 10);
    
    // If user not exists, insert him
    await db.query(`INSERT INTO PUBLIC.PERSON(name, email, password, photourl, provideruid, providername, createdat) 
                    VALUES ('${username}', '${email}', '${encryptedPassword}', '${photourl}', '${provideruid}', '${providername}', now());`);

    return res.status(201).send({ message: 'User ' + username + ' registered!' });
  } catch (error) {
    return res.status(400).send({ error, message: 'Registration failed!' });
  }
}

exports.verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) 
    return res.status(200).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(200).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.idperson = decoded.id;
    next();
  });
}

/**
 * # Update an user.
 * @param {any} req Request data, that contains the requisition body.
 * @param {any} res Response to frontend.
 */
exports.update = async (req: Request, res: Response) => {
  const { idperson, username, email, photourl, password } = req.body;
  try {
    const { rows } = await db.query("SELECT idperson FROM PUBLIC.PERSON WHERE EMAIL LIKE '" + email +"';");

    // If user exists
    if (rows.length <= 0)
      return res.status(200).send({ message: 'User not exists!' });

    const encryptedPassword = await bcrypt.hash(password, 10);
    
    await db.query(`UPDATE PUBLIC.PERSON SET name = '${username}', email = '${email}', password = '${encryptedPassword}', photourl = '${photourl}' WHERE idperson = ${idperson};`);

    return res.status(200).send({ message: 'User updated!' });
  } catch (error) {
    return res.status(400).send({ error, message: 'User update failed!' });
  }
}