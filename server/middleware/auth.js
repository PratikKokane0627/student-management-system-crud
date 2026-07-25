const auth = (req, res, next) => {

    // Check if admin is logged in
    if (req.session.admin) {
        return next();
    }

    // If not logged in, redirect to login page
    res.redirect("/login");
};

export default auth;