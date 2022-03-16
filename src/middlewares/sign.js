import config from "../config";

export default (req, res, next) => {
  res.signIn = ({ access_token, refresh_token, expires_in, ...rest }) => {

    res.cookie(config.server.name + ".sec", access_token, {
      expires : expires_in,
      secure  : false,
      httpOnly: true
    });

    return res.json({
      access_token,
      refresh_token,
      expires_in,
      ...rest
    });
  };

  res.signOut = () => {
    res.clearCookie(config.server.name + ".sec");
    return res.json({});
  };

  next();
};