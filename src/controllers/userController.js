const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const signUpValidation = require("../validations/signUpValidation/signUp.validation");
const loginValidation = require("../validations/loginValidation/login.validation");
const ErrorHandler = require("../middlewares/errorHandler");
const validatePassword = require("../utils/password.validation");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
        const { username, first_name, last_name, email, password, repassword } =
            req.body;

        const validationResult = signUpValidation(
            username,
            first_name,
            last_name,
            email,
            password,
            repassword
        );

        if (validationResult) {
            const encryptPassword = bcrypt.hashSync(
                password,
                bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS))
            );
            const newUser = await User.create({
                username,
                first_name,
                last_name,
                email,
                password: encryptPassword,
                role: "customer",
            });

            await newUser.save();
            res.status(200).send({ Message: "BERHASIL MENDAFTARKAN AKUN!" });
        }
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const credentialsValidation = loginValidation(username, password);

        if (credentialsValidation) {
            const user = await User.findOne({
                where: { username: username },
            });
            if (!user) {
                throw new ErrorHandler("Akun tidak ada!", 400);
            }

            const result = await validatePassword(password, user.password);

            if (result) {
                const token = jwt.sign(
                    {
                        user_id: user.id,
                        username: user.username,
                        user_role: user.role,
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: "1hr" }
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "Lax", // or 'None' if using HTTPS,
                    path: "/",
                    domain: "localhost",
                });
                res.status(200).send({
                    user_id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role,
                });
            } else {
                throw new ErrorHandler("Username atau Password salah!", 400);
            }
        }
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

module.exports = {
    signUp,
    login,
};
