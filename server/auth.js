const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user')

const createTokens = async (user, secret) => {
  const createToken = jwt.sign(
    {
      user: user,
    },
    secret,
    {
      expiresIn: '20m',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: user,
    },
    secret,
    {
      expiresIn: '7d',
    },
  );

  return Promise.all([createToken, createRefreshToken]);
};

const refreshTokens = async (token, refreshToken, context) => {
  let userId = -1;
  try {
    const { user: { id } } = jwt.verify(refreshToken, context.SECRET);
    userId = id;
  } catch (err) {
    return {};
  }

  const user = await User.findOne({ where: { id: userId }, raw: true });

  const [newToken, newRefreshToken] = await createTokens(user, SECRET);
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

const tryLogin = async (name, password, context) => {
  const localUser = await User.findOne({ name });
  if (!localUser)
    throw new Error('Invalid login');

  const valid = await bcrypt.compare(password, localUser.password);
  if (!valid) {
    // bad password
    throw new Error('Invalid login');
  }

  const user = await User.findOne({ where: { id: localUser.user_id }, raw: true });

  const [token, refreshToken] = await createTokens(user, context.SECRET);

  return {
    token,
    refreshToken,
  };
};

module.exports = {
    createTokens,
    refreshTokens,
    tryLogin
}