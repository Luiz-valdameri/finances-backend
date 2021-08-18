

const handleError = (err, req, res, next) => {

    res.status(500).send({ error: err.toString() });

}

module.exports = { handleError }