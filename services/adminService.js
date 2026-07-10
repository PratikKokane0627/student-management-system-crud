import Admin from "../models/Admin.js";

// Login Admin
export const loginAdmin = async (email, password) => {

    const admin = await Admin.findOne({ email });

    if (!admin) {
        return null;
    }

    if (admin.password !== password) {
        return null;
    }

    return admin;
};