const router = require("express").Router();


const { JsonWebTokenError } = require("jsonwebtoken");
const { checkToken } = require("./auth.js");

const {createUser, login, getStudent, createSubject, insertMarks, updateMarks, insertAdminTeacher, insertStudentInfo, calculateMarks, deleteStudent, logout} = require('./user.controller');


router.post("/",checkToken,createUser);
router.post("/createSubject", checkToken, createSubject);

router.post("/insertMarks", checkToken, insertMarks);
router.post("/login",login);
router.get("/getStudent", checkToken, getStudent);
router.patch("/updateMarks", checkToken, updateMarks);
router.delete("/deleteStudent/:id",checkToken,deleteStudent);
router.post("/insertAdminTeacher",checkToken, insertAdminTeacher);
router.post("/insertStudentInfo", checkToken, insertStudentInfo);
router.patch("/calculateMarks",checkToken, calculateMarks);
router.get("/logout", checkToken, logout);
module.exports=router;
