import * as adminService from "../services/adminService.js";

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await adminService.loginAdmin(email, password);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        req.session.admin = {
            id: admin._id,
            email: admin.email
        };

        res.status(200).json({
            success: true,
            message: "Login successful.",
            data: req.session.admin
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const logout = (req, res) => {

    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.status(200).json({
            success: true,
            message: "Logout successful."
        });
    });

};

export const getProfile = (req, res) => {
    res.status(200).json({
        success: true,
        data: req.session.admin
    });
};
