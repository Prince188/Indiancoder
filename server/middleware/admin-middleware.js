const adminMiddleware = async (req, res, next) => {
    try {
        // console.log(req.user);
        const adminRole = req.user.isAdmin;
        if (!adminRole) {
            return res.status(401).json({ msg: 'You are not admin' })
        }
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;