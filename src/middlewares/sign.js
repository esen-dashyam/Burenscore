import config from "../config";

export default (req, res, next) => {
  res.signIn = ({ accessToken, refreshToken, expiresIn, ...rest }) => {
    let token = {},
      cookie = [];

    if (accessToken) {
      let accessSplits = accessToken.split(".");
      token.accessToken = `${accessSplits[0]}.${accessSplits[1]}`;
      cookie[0] = accessSplits[2];
    }

    if (refreshToken) {
      let refreshSplits = refreshToken.split(".");
      token.refreshToken = `${refreshSplits[0]}.${refreshSplits[1]}`;
      cookie[1] = refreshSplits[2];
    }

    res.cookie(config.server.name + ".sec", cookie, {
      expires : expiresIn,
      secure  : false, // set to true if your using https
      httpOnly: true
    });

    return res.json({
      ...token,
      ...rest
    });
  };

  res.signOut = () => {
    res.clearCookie(config.server.name + ".sec");

    return res.json({});
  };

  next();
};