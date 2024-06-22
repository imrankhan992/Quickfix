
exports.sendToken = async (user, StatusCode, res) => {
    const token = await user.getJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // cookie not store i am usng both http and https
        secure: true,
        

        
       
    }
    res.status(StatusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
}
