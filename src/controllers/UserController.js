const debug = require('debug')('API:UserController');
const Boom = require('boom');
const juice = require('juice');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const pdf = require('html-pdf');
const uuid = require('uuid/v4');

exports.createBill = async function (req, res, next) {
try {
    const pdfData = await createPDF();        
    req.session.data = pdfData;
    next();
} catch (error) {
    console.log('error from create Bill', error);
}}

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
            await pdf.create(htmlData).toStream(function (err, stream) {
              if (err) return Boom.badRequest(err);  
              var fileName = uuid() + '.pdf';
              stream.pipe(fs.createWriteStream(`./${fileName}`));
              return fileName;              
            });
    } catch (error) {        
        return next(Boom.badData('Sonething Want Wrong'))
    }
}