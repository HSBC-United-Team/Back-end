const bcrypt = require("bcrypt");

const validatePassword = async (inputtedPassword, accountPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(inputtedPassword, accountPassword, (err, result) => {
            if (err) {
                reject(ErrorHandler("Coba masukan password kembali!", 500));
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = validatePassword;
