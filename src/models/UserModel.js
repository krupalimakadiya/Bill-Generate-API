
var debug = require('debug')('API:UserModel');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  profileImage: { type: String },
  mobile: { type: String },
  gender: { type: String },
  city: { type: String },
  token: { type: String },
  l_d_sph: { type: String },
  l_d_cyl: { type: String },
  l_d_axis: { type: String },
  l_d_va: { type: String },
  l_n_sph: { type: String },
  l_n_cyl: { type: String },
  l_n_axis: { type: String },
  l_n_va: { type: String },
  l_add_sph: { type: String },
  l_cl_sph: { type: String },
  l_cl_cyl: { type: String },
  l_cl_axis: { type: String },
  l_cl_va: { type: String },
  r_d_sph: { type: String },
  r_d_cyl: { type: String },
  r_d_axis: { type: String },
  r_d_va: { type: String },
  r_n_sph: { type: String },
  r_n_cyl: { type: String },
  r_n_axis: { type: String },
  r_n_va: { type: String },
  r_add_sph: { type: String },
  r_cl_sph: { type: String },
  r_cl_cyl: { type: String },
  r_cl_axis: { type: String },
  r_cl_va: { type: String },
});
module.exports = mongoose.model('UserModel', userSchema);
// var UserModel = mongoose.model('UserModel', userSchema);

// exports.findByEmail = function (data, callback) {
//   debug("inside findByEmail");
//   if (!data) {
//     return callback(Boom.notFound('invalid Data'));
//   }
//   console.log("email", data)
//   UserModel.find({ email: data }, function (error, data) {
//     if (error) {
//       debug('error', error)
//       return callback(error);
//     }
//     console.log('model', data)
//     debug('login', data)
//     return callback(null, data);
//   })
// }

// exports.insert = function (data, callback) {

//   debug('inside insert');
//   //debug('data %o', data);
//   if (!data) {
//     return callback(Boom.notFound('invalid Data'));
//   }
//   var newRegData = new UserModel();
//   newRegData.firstName = data.firstName;
//   newRegData.lastName = data.lastName;
//   newRegData.email = data.email;
//   newRegData.password = data.password;
//   newRegData.r_d_sph = data.r_d_sph;
//   newRegData.r_d_cyl = data.r_d_cyl;
//   newRegData.r_d_axis = data.r_d_axis;
//   newRegData.r_d_va = data.r_d_va;
//   newRegData.r_n_sph = data.r_n_sph;
//   newRegData.r_n_cyl = data.r_n_cyl;
//   newRegData.r_n_axis = data.r_n_axis;
//   newRegData.r_n_va = data.r_n_va;
//   newRegData.r_add_sph = data.r_add_sph;
//   newRegData.r_cl_sph = data.r_cl_sph;
//   newRegData.r_cl_cyl = data.r_cl_cyl;
//   newRegData.r_cl_axis = data.r_cl_axis;
//   newRegData.r_cl_va = data.r_cl_va;

//   debug('new regdata', newRegData);
//   newRegData.save(function (error, data) {
//     if (error) {
//       return callback(error);
//     }
//     return callback(null, data);
//   });
// };

// exports.selectAll = function (data, callback) {
//   UserModel.find({}, function (error, data) {
//     if (error) {
//       debug('error', error)
//       return callback(error);
//     }
//     debug('data', data);
//     return callback(null, data);
//   }).lean()
// }

// exports.searchById = function (data, callback) {
//   var id = data.id
//   UserModel.findOne({ _id: id }, function (error, data) {
//     if (error) {
//       debug('error', error)
//       return callback(error);
//     }
//     debug('data', data)
//     return callback(null, data);
//   })
// }

// exports.deleteById = function (data, callback) {
//   var id = data.id
//   UserModel.findByIdAndRemove({ _id: id }, function (error, data) {
//     if (error) {
//       debug('error', error)
//       return callback(error);
//     }
//     debug('data', data)
//     return callback({ message: "Record Deleted" });
//   })
// }

// exports.updateById = function (data, callback) {
//   const id = data.id;
//   const userData = data;
//   const options = {
//     upsert: true,
//     new: true,
//   }
//   UserModel.findOneAndUpdate({ _id: id }, { $set: userData }, options, function (error, data) {
//     if (error) {
//       debug('error', error)
//       return callback(error);
//     }
//     debug('data from modelllllllll', data)
//     return callback(null, data);
//   })
// } 
