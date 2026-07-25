const auth = (req, res, next) => {

    if (req.session.admin) {
        return next();
    }

    res.status(401).json({
        success: false,
        message: "Please login to continue"
    });
};

export default auth;
