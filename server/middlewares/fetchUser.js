import jwt from "jsonwebtoken";

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "You are not authorized user." });
        return;
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: "please authenticate using valid2 token" });
    }
}

export default fetchUser;