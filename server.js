import express from 'express';
import session from 'express-session';
import connectDb from './db.js';
import Student from './models/Student.js';
import Admin from './models/Admin.js';
import "dotenv/config";
const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000
        }
    })
);


function auth(req, res, next) {

    if (req.session.admin) {

        return next();

    }

    res.redirect("/login");

}



app.get("/", (req, res) => {

    if (req.session.admin) {

        return res.redirect("/students-list");

    }

    res.redirect("/login");

});



// Admin
app.get("/login", (req, res) => {

    res.render("login");

});

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        // console.log(admin);

        if (!admin) {

            return res.send("Admin not found");

        }

        if (admin.password !== password) {

            return res.send("Incorrect Password");

        }

        req.session.admin = admin;

        res.redirect("/students-list");

    } catch (err) {

        res.send(err.message);

    }

});

app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

});


// render page
app.get('/login', (req, res) => {
    res.render("login")
})
app.get('/students-list', auth, (req, res) => {
    res.render('students');
});

app.get('/add', auth, (req, res) => {
    res.render('add');
});

app.get('/update/:id', auth, (req, res) => {
    res.render('update');
});


// Add a new user
app.post('/api/add-students',auth, async (req, res) => {
    try {

        await Student.create(req.body);
        res.json({success: true,
            message: "Student added successfully."});

    } catch (err) {
        res.status(500).json({success: false,
            message: err.message})
    }
})

// Get all users
app.get("/api/students", auth,async (req, res) => {
    try {

        const students = await Student.find();

        res.json(students);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});

// read a single user
app.get('/api/students/:id', auth,async (req, res) => {

    try {
        const students = await Student.findById(req.params.id);
        res.json(students);

    } catch (err) {
        res.status(500).send(err.message)
    }

})

// update a user
app.put('/api/students/:id',auth, async (req, res) => {

    try {
        await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({success:true,message:"Student updated successfully"});

    } catch (err) {
        res.status(500).json({success:false,message:err.message})
    }

})

// delete user
app.delete('/api/students/:id', auth,async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({success:true,message:"Student deleted successfully."})
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


const PORT= process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});