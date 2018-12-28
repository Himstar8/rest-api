import Shop from './shop.model';
import shopservice from './shop.service';

export default {
  async add(req, res) {
    try {
      const placeId = req.body.place_id;
      let user = req.user;

      await Shop.findOne({ place_id: placeId }).then(shop => {
        if (shop) {
          user.addShop(shop._id).then(() => {
            return res.status(201).json({ success: true });
          });
        } else {
          const { value, error } = shopservice.validateShop(req.body);
          if (error && error.details) {
            return res.status(400).json({ error });
          }
          console.log('test');
          Shop.create(value)
            .then(shop => {
              return user.addShop(shop._id);
            })
            .then(() => {
              return res.status(201).json({ success: true });
            });
        }
      });
    } catch (error) {
      return res.status(500).send(err);
    }
  },

  remove(req, res) {
    try {
      const user = req.user;
      const shopId = req.params['id'];
      console.log(user._id, shopId);
      return user.removeShop(shopId).then(() => {
        return res.status(200).json({ success: true });
      });
    } catch (error) {
      return res.status(500).send(err);
    }
  }
};
