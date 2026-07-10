import * as adminService from "../services/adminService.js";

// Home Route
export const home = (req, res) => {

    if (req.session.admin) {
        return res.redirect("/students-list");
    }

    res.redirect("/login");
};

// Render Login Page
export const showLogin = (req, res) => {
    res.render("login");
};

// Login Admin
export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await adminService.loginAdmin(email, password);

        if (!admin) {
            return res.send("Invalid Email or Password");
        }

        req.session.admin = {
            id: admin._id,
            email: admin.email
        };

        res.redirect("/students-list");

    } catch (err) {

        res.status(500).send(err.message);

    }
};

// Logout Admin
export const logout = (req, res) => {

    req.session.destroy(() => {
        res.redirect("/login");
    });

};