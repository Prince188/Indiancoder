const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    const extraDetail = err.extraDetail || "Error from backend server"

    return res.status(status).json({ message , extraDetail })
}

module.exports = errorMiddleware;