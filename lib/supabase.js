// JWT verification function with RS256 support only
const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    // Use RS256 verification with JWKS
    jwt.verify(token, getKey, {
      audience: `${supabaseUrl}/auth/v1`,
      issuer: `${supabaseUrl}/auth/v1`,
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
