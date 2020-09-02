const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     if (req.headers['authorization']) {
//       const token = req.headers['authorization'].split(' ')[1];
//       jwt.verify(token, process.env.SECRET, (err, decoded) => {
//         if (err) {
//           // res.json({
//           //   success: false,
//           //   message: 'Failed to authenticate token',
//           // });
//           next(Error('Failed to authenticate token'));
//         } else {
//           req.decoded = decoded;
//           next();
//         }
//       });
//     } else {
//       // res.status(403).json({
//       //   status: false,
//       //   message: 'No token provided',
//       // });
  
//       next(Error('No token provided'));
//     }
//   };

  module.exports = function(req, res, next) {
      const token = req.header('access_token');
      if(!token) return res.status(401).send('no auth');

      try {
          const verified = jwt.verify(token, process.env.TOKEN_SECRET)
          req.user = verified;
          next()
      } catch(err) {
          res.status(400).send('invalid token')
      }
  }