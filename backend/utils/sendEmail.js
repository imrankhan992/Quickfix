const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "gmail", // Corrected service property
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        html: `<div class="border flex flex-col items-center justify-center w-full bg-white">
       
        <p style="color: #047857; font-size: 1.25rem; text-align: center; font-weight: 700;">
          Hi ${options.name}! <br /> ${options.message}
        </p>
      </div>`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
