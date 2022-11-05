import nodeMailer from "nodemailer"

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    service:process.env.SMTP_SERVICE,
    secure:false,
    auth:{
      user:process.env.SMTP_MAIL,
      pass:process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from:process.env.SMTP_MAIL,
    to: 'sufyan.zaki.789@gmail.com',
    subject: options.subject,
    text: options.message,
};

  await transporter.sendMail(mailOptions);

  transporter.verify().then((res)=>{return 0}).catch((error)=>console.log(error))

};

export default sendEmail;