const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const ChurchSchema = new Schema(
  {
    title: String,
    address: String,
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    images: [ImageSchema],
    leadPastor: String,
    phoneNumber: Number,
    description: String,
  },
  opts
);

ChurchSchema.virtual('properties.popupMarkup').get(function () {
  return `
  <strong><a href="/churches/${this._id}">${this.title}</a></strong>
  <p>${this.leadPastor}</p>`;
});

module.exports = mongoose.model('Church', ChurchSchema);
