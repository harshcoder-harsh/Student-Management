import nodemailer from 'nodemailer';
import logger from './logger';

// Mock setup for nodemailer
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
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
