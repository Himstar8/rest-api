import Joi from 'joi';

export default {
  validateShop(body) {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      place_id: Joi.string().required(),
      photo_reference: Joi.string().required(),
      rating: Joi.number().optional(),
      types: Joi.array()
        .items()
        .optional(),
      vicinity: Joi.string().optional()
    });
    const { value, error } = Joi.validate(body, schema);
    if (error && error.details) {
      return { error };
    }
    return { value };
  }
};
