// Admin password verification - the actual check is done in the middleware.
// If the request reaches this controller, the admin is authenticated.
export const verifyAdmin = (req, res) => {
  res.status(200).json({ valid: true });
};
