import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.json({ status: 401, message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.json({ status: 401, message: "Unauthorized" });
            }
            req.user = user;
            next();
        })

    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}