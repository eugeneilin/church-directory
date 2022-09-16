const Church = require('../models/church');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
  const churches = await Church.find({});
  res.render('churches/index', { churches });
};

module.exports.renderNewForm = (req, res) => {
  res.render('churches/add-new');
};

module.exports.addChurch = async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.church.address,
      limit: 1,
    })
    .send();
  const church = new Church(req.body.church);
  church.geometry = geoData.body.features[0].geometry;
  church.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  await church.save();
  console.log(church);
  req.flash('success', 'Successfully added new church.');
  res.redirect(`/churches/${church._id}`);
};

module.exports.showChurch = async (req, res) => {
  const church = await Church.findById(req.params.id);
  if (!church) {
    req.flash('error', 'Cannot find that church.');
    return res.redirect('/churches');
  }
  res.render('churches/show', { church });
};

module.exports.renderEditForm = async (req, res) => {
  const church = await Church.findById(req.params.id);
  if (!church) {
    req.flash('error', 'Unable to edit. Cannot find that church.');
    return res.redirect('/churches');
  }
  res.render('churches/edit', { church });
};

module.exports.updateChurch = async (req, res) => {
  const { id } = req.params;
  const church = await Church.findByIdAndUpdate(id, { ...req.body.church });
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  church.images.push(...imgs); // spread only takes data from array, not entire array
  await church.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await church.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
  }
  req.flash('success', 'Successfully updated church.');
  res.redirect(`/churches/${church._id}`);
};

module.exports.deleteChurch = async (req, res) => {
  const { id } = req.params;
  await Church.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted church.');
  res.redirect('/churches');
};
