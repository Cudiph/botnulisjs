const mongoose = require('mongoose');

const userSettings = mongoose.Schema({
  userID: { type: String, required: true },
  paper: String,
  font: String,
  color: String,
  langCode: String,
}, { timestamps: true });

const userSettingsModel = mongoose.model('userSettings', userSettings);

module.exports = {
  userSettingsModel,
};
