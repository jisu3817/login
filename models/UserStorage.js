const db = require("../config/db");

class userStorage {
    static getUsers (id) {
        return new Promise ((resolve, reject) => {
            db.query("SELECT * FROM Users WHERE id=?", [id], (err, data) => {
                if (err) reject(err);
                resolve(data[0]);
            });
        });
    };
};

module.exports = userStorage;