const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users'); // Update with your actual model path


class MasterService {
    constructor() {
        // Define your email configuration
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'codethelabs@gmail.com',  // Replace with your email
            pass: 'hdpw mbsy xxej crix',         // Replace with your app password
          },
        });
      }
    
      async sendEmail(to, subject, body, title) {
            try {
                // Create email options
                const mailOptions = {
                    from: 'codethelabs@gmail.com',
                    to,
                    subject,
                    html: `<div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; max-width: 400px; margin: 0 auto; display: block; align-items: center;">
                                <div style="height: 80px; width: 100%; background-color: white; display: flex; justify-content: center; align-items: center; text-align: center;">
                                    <h1>${title}</h1>
                                </div>
                                <div>${body}</div>
                            </div>`
                };
        
                // Send the email
                await this.transporter.sendMail(mailOptions);
        
                return { success: true, message: 'Email sent successfully' };
            } catch (error) {
                return { success: false, message: 'Error sending email' };
            }
        }
    
      
async authenticateToken (req, res, next){
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};
    
    
    
}

module.exports = MasterService;
