const express = require('express');


const pool = require("./database.js");
const query = require("./postgresQuery.json");

module.exports = {
    createUser: (data, callback) => {
        pool.query(
            query.createStudent,
            [
              data.id,
              data.password,
              data.access,
              data.accesscontrol
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                console.log(results);
                return callback(null, results);
            }
        );  
    },
    getUserbyId: (id,callback) => {
        
        pool.query(
            query.getUserbyUserId,
            [id],
            (error, results, fields) => {
                if (error){
                    return callback(error);
                }       
                return callback(null, results.rows[0]);
            }
        );
    },

    getStudent: (id, callback) => {
       console.log("fhdkhf");
        pool.query(
            query.getStudent,
            [id],
            (error, results) => {
                if (error) {
                    console.log("fbjdhsbf");
                    return callback(error);
                }
                console.log(results.rows);
                return callback(null, results.rows);
            }

        );
    },

    createSubject: (data, callback) => {
        pool.query(
            query.createSubject,
            [
                data.subjectid,
                data.subjectname,
                data.classname,
                data.passmarks
            ],
            (error, results) => {

                if(error) {
                    console.log(results);
                    return callback(null,results);
                }
                console.log(results);
                return callback(null, results);
            }
        );
    },
    insertMarks: (data, callback) => {
        pool.query(
            query.insertMarks,
        [
            data.studentid,
            data.subjectid,
            data.subject_marks
        ],
        (error, results) => {
            if (error){
                return callback(error);
            }
            return callback(null, results);
            }
        );
    },
    updateMarks: (data, callback) => {
        pool.query(
            query.updatetMarks,
        
            [
                data.studentid,
                data.subjectid,
                data.subject_marks
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    calculateMarks: (data, callback) => {
        pool.query(
            query.calculateMarks,
            [
                data.id
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    insertAdminTeacher: (data, callback) => {
        pool.query(
            query.insertAdminTeacher,
            [
                data.id,
                data.name,
                data.phone,
                data.address
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    insertStudentInfo: (data, callback) =>{
        pool.query(
            query.insertStudentInfo,
            [
                data.id,
                data.student_name,
                data.roll
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);

            }

        );
    },
    deleteStudent: (data, callback) =>{
        console.log("data is", data.id);
        pool.query(
            query.deleteStudent,
            [
                id1
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);

            }

        );
    }

}
    /*

}
    
,
    createAdmin_teacher:  (data, callback) => {
        pool.query(
            postgresQuery.createAdmin_teacher,
            [
                data.id,
                data.name,
                data.phone,
                data.address
            ],
            (error, results, fields) => {
                if(error) {
                    console.log(results);
                    return callback(null,results);
                }
                console.log(results);
                return callback(null,results);
            }
        )
    },

    updateMarks: (data, callback) => {
        pool.query(
            postgresQuery.updateMarks,
        [
            data.id,
            data.subject_id,
            data.subject_marks
        ],
        (error, results, fields) => {
            if (error){
                return callback(error);
            }
            return callback(null, results);
            }
        );
    },
    deleteStudent: (data, callback) => {
        pool.query(
            postgresQuery.deleteStudent,
            [data.id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results.rows);
            }
        );
    },

}
*/
