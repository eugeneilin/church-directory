const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html')

const extension = (joi) => (
  {
    type: 'string',
    base: joi.string(),
    messages: {
      'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
      escapeHTML: {
        validate(value, helpers) {
          const clean = sanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},
          
          })
          if (clean !== value) return helpers.error('string.escapeHTML', {value})
          return clean;
        }
      }
    }
  }
)

const Joi = BaseJoi.extend(extension)

module.exports.churchSchema = Joi.object({
  church: Joi.object({
    title: Joi.string().required().escapeHTML(),
    address: Joi.string().required().escapeHTML(),
    leadPastor: Joi.string().required().escapeHTML(),
    phoneNumber: Joi.number().required().min(0),
    description: Joi.string().required().escapeHTML(),
  }).required(),
  deleteImages: Joi.array(),
});
