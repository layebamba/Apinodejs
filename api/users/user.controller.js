const { create, getuserByuserId, getusers, updateUser, deleteUser, getUserByUserEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "error database not connected"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "database connected successfully"
            });
        });
    },
    getuserByuserId: (req, res) => {
        const id = req.params.id;
        getuserByuserId(id, (err, results) => {
            if (err) {
                console.log(error);
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getusers: (req, res) => {
        getusers((err, results) => {
            if (err) {
                console.log(error);
                return
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },


    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(error);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update"
                });
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(error);
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "deleted successfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password)
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                })
            } else {
                return res.json({
                    success: 0,
                    data: "invalid email or password"
                })
            }
        });


    }

}