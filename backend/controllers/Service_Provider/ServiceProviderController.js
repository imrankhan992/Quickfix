exports.registerUserController = async (req, res) => {
    try {
        res.status(200).send("send hello")
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error,
            sucess: false
        })
    }
}