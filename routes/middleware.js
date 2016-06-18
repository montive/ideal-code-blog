/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('underscore');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'INICIO', key: 'home', href: '/' },
		{ label: 'NOSOTROS', key: 'about', href: '/about' },
		{ label: 'BLOG', key: 'blog', href: '/blog' },
		{ label: 'TRABAJOS', key: 'gallery', href: '/gallery' },
		{ label: 'SERVICIOS', key: 'services', href: '/services'},
		{ label: 'CONTACTO', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.any(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};

/**
	Redirects www to non www
	*/
	exports.wwwRedirect = function (req, res, next) {
	    if (req.headers.host.slice(0, 4) === 'www.') {
	        var newHost = req.headers.host.slice(4);
	        return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
	    }
	    next();
	};
