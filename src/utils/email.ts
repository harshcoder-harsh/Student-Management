import nodemailer from 'nodemailer';
import logger from './logger';
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user, 
        pass: testAccount.pass 
      }
    });
    const info = await transporter.sendMail({
      from: '"Student Management" <admin@studentmanagement.com>',
      to,
      subject,
      text
    });
    logger.info(`Message sent: ${info.messageId}`);
    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (error) {
    logger.error('Email sending failed', error);
  }
};
