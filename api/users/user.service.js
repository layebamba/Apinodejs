const pool = require("../../configuration/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into registration(nom,prenom,email,password,genre,tel) values(?,?,?,?,?,?)`,
            [
                data.nom,
                data.prenom,
                data.email,
                data.password,
                data.genre,
                data.tel
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results[0]);
            }

        );
    },
    getusers: callback => {
        pool.query(`select id,nom,prenom,email,password,genre,tel from registration`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callback(error);
                }
                return callback(null, results)
            });
    },
    getuserByuserId: (id, callback) => {
        pool.query(`select id,nom,prenom,email,password,genre,tel from registration where id= ?`,
            [id], (err, results, fields) => {
                if (err) {
                    return callback(error);
                }
                return callback(null, results[0])
            });
    },
    updateUser: (data, callback) => {
        pool.query(`update registration set nom=?,prenom=?,email=?,password=?,genre=?,tel=? where id= ?`,
            [
                data.nom,
                data.prenom,
                data.email,
                data.password,
                data.genre,
                data.tel,
                data.id
            ], (err, results, fields) => {
                if (err) {
                    callback(err);
                }
                return callback(null, results[0]);
            });
    },
    deleteUser: (data, callback) => {
        pool.query(`delete from registration where id= ?`,
            [data.id], (err, results, fields) => {
                if (err) {
                    callback(err);
                }
                return callback(null, results[0]);
            });
    },
    getUserByUserEmail: (email, callback) => {
        pool.query(`select * from registration where email= ?`,
            [email],
            (err, results, fields) => {
                if (err) {
                    callback(err);
                }
                return callback(null, results[0])
            });
    }
}