import userService from './user.service';
import User from './user.model';
import jwt from '../../helpers/jwt';

export default {
  async signup(req, res) {
    try {
      console.log(req.body);
      const { value, error } = userService.validateSignup(req.body);
      if (error) {
        return res.status(400).json(error);
      }
      const encryptedPass = userService.encryptPassword(value.password);

      const user = await User.create({
        email: value.email,
        password: encryptedPass
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  async login(req, res) {
    try {
      // console.log(req.body);
      const { value, error } = userService.validateLogin(req.body);
      if (error) {
        return res.status(400).json(error);
      }
      const user = await User.findOne({ email: value.email });
      if (!user) {
        return res.status(401).json({ error: { message: 'unauthorized' } });
      }
      const authenticted = userService.comparePassword(
        value.password,
        user.password
      );
      if (!authenticted) {
        return res.status(401).json({ error: { message: 'unauthorized' } });
      }
      const token = jwt.issue({ id: user._id }, '1d');
      return res.json({ token });
    } catch (err) {
      // console.error(err);
      return res.status(500).send(err);
    }
  },

  // return an user's liked shops
  getlikedShops(req, res) {
    try {
      const user = req.user;

      user
        .populate({
          path: 'likedShops'
        })
        .execPopulate()
        .then(function(user) {
          return res.json({
            shops: user.likedShops.map(function(item) {
              return item.toJSON();
            })
          });
        });
    } catch (error) {
      // console.error(err);
      return res.status(500).send(err);
    }
  },

  async checkEmail(req, res) {
    try {
      console.log(req.body.email);
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.json({ message: 'This email is already taken' });
      }
      return res.send();
    } catch (error) {
      // console.error(err);
      return res.status(500).send(err);
    }
  }
};
