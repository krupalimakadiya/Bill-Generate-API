const debug = require('debug')('API:UserController');
const UserModel = require('../models/UserModel');
const Boom = require('boom');
const juice = require('juice');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const pdf = require('html-pdf');
const uuid = require('uuid/v4');
// var html = fs.readFileSync(path.join(__dirname, '../lib/templates') + '/verificationEmail.html', 'utf8');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

exports.createBill = async function (req, res, next) {
debug('inside controller');
try {
    console.log('req.body', req.body);    
    // const userData = await createUser(req.body);
    const invoiceObj = {        
         firstName : "Keval",
          lastName: "Makadiya",
          address: "1234 Main Street",
          city: "San Francisco",
          state: "CA",
          country: "US",
          postal_code: 94111,        
        items: [
          {
            item: "TC 100",
            description: "Toner Cartridge",
            quantity: 2,
            unit: 2,
            amount: 6000
          },
          {
            item: "USB_EXT",
            description: "USB Cable Extender",
            quantity: 1,
            unit: 5,
            amount: 2000
          }
        ],
        subtotal: 8000,
        paid: 0,
        invoice_nr: 1234
      };    
    const pdfData = await createPDF(invoiceObj);        
    req.session.data = pdfData;
    next();
    // res.send("hello world")
} catch (error) {
    console.log('error from create Bill', error);
}
}

async function createPDF(req, res, next) {
    try {  
      const fileData = fs.readFileSync(path.join(__dirname, '../lib/templates') + '/generateBill.html', 'utf8');
      var compiledTemplate = await _.template(fileData);
      const invoiceObj = {        
                firstName : "Keval",
                 lastName: "Makadiya",
                 address: "1234 Main Street",
                 city: "San Francisco",
                 state: "CA",
                 country: "US",
                 postal_code: 94111,        
               items: [
                 {
                   item: "TC 100",
                   description: "Toner Cartridge",
                   quantity: 2,
                   unit: 2,
                   amount: 6000
                 },
                 {
                   item: "USB_EXT",
                   description: "USB Cable Extender",
                   quantity: 1,
                   unit: 5,
                   amount: 2000
                 }
               ],
               subtotal: 8000,
               paid: 0,
               invoice_nr: 1234
             };    
            compiledTemplate = compiledTemplate(invoiceObj);            
            var htmlData = juice(compiledTemplate);                        
            pdf.create(htmlData).toStream(function (err, stream) {
              if (err) return Boom.badRequest(err);  
              var fileName = uuid() + '.pdf';
              stream.pipe(fs.createWriteStream(`./${fileName}`));
              return fileName;              
            });
    } catch (error) {
        console.log('error from create PDF', error);
        Boom.badData('Sonething Want Wrong');
    }
}

async function createUser(req, res, next) {
    try {
        console.log('req', req)
        const user = new UserModel(req);
        const userData = await user.save(req);
        console.log('userDta', userData);
        return userData;
    } catch (error) {
        console.log('error from create user', error);
        Boom.badData('Sonething Want Wrong');
    }
}