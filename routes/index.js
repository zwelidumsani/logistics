var express = require('express');
var router = express.Router();
var passport = require('passport')
var easyinvoice = require('easyinvoice');
var fs = require('fs');
var Company = require("../models/company");


//Login page
router.get('/login', function(req, res) {
	 var messages = req.flash('error');
     res.render('login.handlebars',{layout: 'loginlayout.handlebars', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

//Signin post
router.post('/signin',passport.authenticate('local', {
	 failureRedirect:'/login',
	 failureFlash: true
    }), function(req, res, next){
			res.redirect('/dashboard');	
	}
);

/* GET home page. */
router.get('/dashboard', isLoggedIn, function(req, res, next) {
   res.render('index.handlebars');
});


//Signup page
router.get('/signup', function(req, res, next) {
     var messages = req.flash('error');
     res.render('signup.handlebars', {layout: 'loginlayout.handlebars',csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});


//Signup post
router.post('/signup',passport.authenticate('strategy', {
	 failureRedirect:'/signup',
	 failureFlash: true
    }), function(req, res,next){
			res.redirect('/login');
	}   
);


//Registration page
router.get('/registration', isLoggedIn, function(req, res, next) {
   var companyInfoSaved = req.flash('Company_info_saved')[0];
   res.render('registration.handlebars', { csrfToken: req.csrfToken(), companyInfoSaved: companyInfoSaved, companyInfoSaved: !companyInfoSaved });
});

//Registration  post
router.post('/registration', isLoggedIn, function(req, res, next) {
            var newCompany = {};
			
	         newCompany = new Company({
		     companyName: req.body.companyName,
		     companyEmail: req.body.companyEmail,
		     companyPhone: req.body.companyPhone,
		     companyStreet: req.body.companyStreet, 
		     companyTown: req.body.companyTown,
		     companyCountry: req.body.companyCountry
	    }); 
		
		newCompany.save(function(err, doc){
			if(err){
				 console.log("Could not save company Info.",err.message);
			}else {
				 req.flash('Company_info_saved', 'Client added successfully')
				 console.log("Company info saved successfully")
				 res.redirect('/registration'); 
			}
		});	
});









router.get('/logout', isLoggedIn, function(req, res, next){
    req.logout();
	res.redirect('/login');
});


//Easy invoice Text
router.get('/invoice', function(req, res, next){
	 
var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
    "currency": "SZL", //See documentation 'Locales and Currency' for more info
    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
    "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64 //img or pdf
    "sender": {
        "company": "ECO - FREIGHT PTY LTD",
        "address": "Mhlakuvane ST 67",
        "zip": "H300",
        "city": "Mbabane",
        "country": "Swaziland"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
       	"company": "Icon Construction PTY LTD",
       	"address": "Mancishane St 456",
       	"zip": "H100",
       	"city": "Manzini",
       	"country": "Swaziland"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2021.0001",
    "invoiceDate": "30.08.2021",
    "products": [
        {
            "quantity": "2",
            "description": "Air Freight",
            "tax": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "In-land Freight",
            "tax": 21,
            "price": 10.45
        }
    ],
    "bottomNotice": "Kindly pay your invoice within 15 days.",
    //Used for translating the headers to your preferred language
    //Defaults to English. Below example is translated to Dutch
    // "translate": { 
    //     "invoiceNumber": "Factuurnummer",
    //     "invoiceDate": "Factuurdatum",
    //     "products": "Producten", 
    //     "quantity": "Aantal", 
    //     "price": "Prijs",
    //     "subtotal": "Subtotaal",
    //     "total": "Totaal" 
    // }
};

//Create your invoice! Easy!
easyinvoice.createInvoice(data, async function (result) {
    //The response will contain a base64 encoded PDF file
	 await fs.writeFileSync("./invoice/invo.pdf", result.pdf, 'base64');
     res.end("Invoice generated.");	
});

	
});


function isLoggedIn (req, res, next){
   if (req.isAuthenticated()) {
	   return next();
   }
   
     res.redirect('/login');
}

function isNotLoggedIn (req, res, next){
   if (!req.isAuthenticated()) {
	   return next();
   }
   res.redirect('/');
}



module.exports = router;
