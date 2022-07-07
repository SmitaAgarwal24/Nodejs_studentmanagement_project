const {
    createUser,
    getUserbyId,
    getStudent,
    createSubject,
    insertMarks,
    updateMarks,
    insertAdminTeacher,
    insertStudentInfo,
    calculateMarks,
    deleteStudent
} = require("./user.service");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const pool = require("./database");
const query = require("./postgresQuery.json");

module.exports = {
    createUser: (req, res) => {

        let body = req.body;
        id = body.id;
        console.log("id is", id);

        if (req.validate != 'admin' && req.validate != 'teacher') {
            console.log("hi");
            return res.json({
                success: 0,
                message: "Access type must be either admin or student"
            }
            );
        }
        else if (body.id == null || body.password == null) {
            console.log("hello");

            return res.json({
                success: 0,
                message: "Id and password are mandatory field"
            }
            );
        }
        pool.query(query.getUserbyUserId, [id], (err, results) => {


            if(err){
                return res.status(500).json({
                    message: "System error"
                });

            }

            if (results.rows.length > 0) {
                console.log("result is", results);
                return res.status(500).json({
                    message: "User already exist"
                });
            }
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            createUser(body, (err, results) => {
                if (res == true) {
                    return res.status(500).json({
                        message: "User already exist"
                    });
                } else {

                    return res.status(200).json({
                        success: 1,
                        data: "created successfully"
                    });
                }
            });
        })
    },
    login: (req, res) => {
        const body = req.body;
        id1 = req.body.id;

        /*function storeId(id1) {
            pool.query('insert into storeid(id) values($1)', [id1], (err, results) => {
                if (err) {
                    return console.log(err);
                }
                else {
                    console.log(results);
                }
            })
        }
        storeId(id1);*/

        getUserbyId(body.id, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }


            let result = compareSync(body.password, results.password);

            if (result) {
                results.password = undefined;
                let jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });

                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            }
            else {
                return res.json({
                    success: 0,
                    data: "Invalid id or password"
                });
            }
        });
    },

    getStudent: (req, res) => {

        let id1 = req.body.id;



        if (req.validate == 'student' && req.validateid == id1 || req.validate == 'admin' || req.validate == 'teacher') {
            getStudent(id1, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                return res.send(results);
            });
        }
        else if (req.validate == 'student' && req.validateid != id1) {
            return res.status(401).json("Enter a valid id");

        }
    },


    createSubject: (req, res) => {

        let body = req.body;

        if (req.validate == "student") {
            return res.status(401).json("you are not authorised to create a subject");
        }

        createSubject(body, (err, results) => {


            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: "created successfully"
            });
        });
    },

    insertMarks: (req, res) => {

        let body = req.body;


        if (req.validate == 'student') {
            return res.status(401).json("you are not authorised to insert marks");
        }

        insertMarks(body, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            return res.status(200).json({
                success: 1,
                data: "Marks enetered successfully"
            });

        });
    },

    updateMarks: (req, res) => {

        let body = req.body;


        if (req.validate == 'student') {
            return res.status(401).json("you are not authorised to update marks");
        }

        updateMarks(body, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: "updated successfully"
            });
        });
    },

    calculateMarks: (req, res) => {

        let body = req.body;


        if (req.validate == 'student') {
            return res.status(401).json("you are not authorised to calculate marks");
        }

        calculateMarks(body, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: "calculated successfully"
            });
        });
    },

    insertAdminTeacher: (req, res) => {

        let body = req.body;


        if (req.validate == 'student' || req.validate == 'teacher') {
            return res.status(401).json("you are not authorised to enter teacher or admin details");

        }

        insertAdminTeacher(body, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: "Admin Teacher inserted successfully"
            });
        });
    },

    insertStudentInfo: (req, res) => {

        let body = req.body;


        if (req.validate == 'student') {
            return res.status(401).json("Only teacher and admin can enter students info");
        }

        insertStudentInfo(body, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: "Student info inserted successfully"
            });

        });
    },

    deleteStudent: (req, res) => {
        
        id1 = req.params.id;
        console.log("req is",req.params.id);


        if (req.validate == 'student') {
            return res.status(401).json("Only teacher and admin can delete students info");
        }


        deleteStudent(id1, (err, results) => {

            if (err) {
                console.log(err);
                return;
            }
            console.log("results", results);
            

            if (results.rowCount == 0) {

                console.log("in if code");
                return res.status(400).json("No such user in the database");

            }
            else if (results.rowCount > 0) {
                return res.status(200).json({

                    success: 1,
                    data: "Student info deleted successfully"
                });
            }

        });
    },
    logout: (req, res) => {

        let body = req.body;
        id = body.id;

        function deleteId(id) {
            pool.query('delete from storeid where id = $1', [id], (err, results) => {
                if (err) {
                    return console.log(err);
                }
                else {
                    console.log("successful");
                    return res.status(400).json("logged out successfully");
                }
            })
        }

        deleteId(id);
    }

}




