"use strict";
const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const user = this.body;
        const { id, password } = await UserStorage.getUsers(user.id) || {};

        console.log(id, password);
        if (id) {
            if (id === user.id && password === user.password) {
                return { success: true};
            }
            return { succcess: false, msg: "비밀번호가 틀렸습니다." };
        }
        return { success: false, msg: "존재하지 않는 아이디입니다." };
    }
}

module.exports = User;