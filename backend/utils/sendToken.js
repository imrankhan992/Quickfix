
exports.sendToken = async (user, StatusCode, res) => {
    const token = await user.getJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,// False to Allow both HTTP and HTTPS
        sameSite: 'Lax', // Lax to allow CSRF protection by default and strict to disallow CSRF protection and None to disable CSRF protection
    }
    res.status(StatusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
}
