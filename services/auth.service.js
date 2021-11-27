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

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.userMail, // generated ethereal user
        pass: config.passwordMail, // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: '<test.mail@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'You have recieved a new email', // Subject line
      text: 'Hello there 👋', // plain text body
      html: '<b>What is it going dude?</b>', // html body
    });

    return { message: 'Mail sent'}
  }
}

module.exports = AuthService;
