import nodeMailer from "nodemailer"

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    service:'gmail',
    auth:{
      user:"arham.ali.098076@gmail.com",
      pass:"zxwptyxkdczbdpil",
    },
  });

  const mailOptions = {
    from:"arham.ali.098076@gmail.com",
    to: 'sufyan.zaki.789@gmail.com',
    subject: options.subject,
    text: options.message,
};

  await transporter.sendMail(mailOptions);

  transporter.verify().then((res)=>{console.log(res)}).catch((error)=>console.log(error))

};

// sendEmail({message : 'message', subject : 'subject'});

export default sendEmail;