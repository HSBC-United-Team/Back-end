require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const cartRoute = require("./routes/cartRoutes");
const favRoute = require("./routes/favRoutes");
const ErrorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/authentication");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/favorites", auth, favRoute);

app.use("*", (_, res, next) => {
    next(new ErrorHandler("Page not found!", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Tidakkk, ada sesuatu yang salah!";
    res.status(statusCode).send(err.message);
});

app.listen(PORT, () => {
    console.log(`APP IS RUNNING ON PORT ${PORT}`);
});
