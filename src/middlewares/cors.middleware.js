const allowedOrigins = process.env.ALLOWED_ORIGINS || "*";

const isOriginAllowed = (origin) => {
    if (allowedOrigins === "*") {
        return true;
    }
    const origins = allowedOrigins.split(",");
    return origins.includes(origin);
};

const corsOptionsDelegate = (req, callback) => {
    const origin = req.header("Origin");
    const corsOptions = {
        origin: isOriginAllowed(origin),
        credentials: true,
    };
    callback(null, corsOptions);
};

module.exports = corsOptionsDelegate;
