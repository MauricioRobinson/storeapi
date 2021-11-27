const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('./user.service');
const service = new UserService();
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = await jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: config.userMail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recover passwrord', // Subject line
      html: `<b>Enter to this link to recover your password 👉 ${link}</b>`, // html body
    };

    const sendMail = await this.sendMail(mail);
    return sendMail;
  }

  async sendMail(infoMail) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.userMail, // generated ethereal user
        pass: config.passwordMail, // generated ethereal password
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
