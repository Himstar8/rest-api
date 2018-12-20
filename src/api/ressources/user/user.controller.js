import User from './user.model';
import userService from './user.service';
import jwt from 'jsonwebtoken';
import config from '../../../config/config';

export default {
  async login(req, res) {
    try {
      const { value, error } = userService.validateLogin(req.body);
      if (error) {
        return res.status(400).json(error);
      }
      const user = await User.find({ email: value.email });
      const authenticated = userService.comparePasswor(
        value.password,
        user.password
      );

      if (!authenticated) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, config.SECRET_KEY);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  async signup(req, res) {
    try {
      const { value, error } = userService.validateSignup(req.body);
      if (error) {
        res.status(400).json(error);
      }
      const encrpytedPassword = userService.encryptPassword(value.password);

      const user = await User.create({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: encrpytedPassword
      });
      return res.status(201).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
