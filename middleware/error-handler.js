const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something Went Wrong... Try again later"
    }
    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(" , ")
        customError.statusCode = 400;
    }

    if (err.code && err.code === 11000) {
        customError.msg = `The Email ${Object.values(err.keyValue)} already exists. Please choose another email.`
        customError.statusCode = 400
    }
    if (err.name === "CastError") {
        customError.msg = `No Item Found with id ${err.value}`
        customError.statusCode = 404;
    }
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware