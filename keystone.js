// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'TopperQ Blog',
	'brand': 'TopperQ Blog',
	'signin logo': ['../images/logo.png'],
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon_topperq.ico',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Blogusers',
	'mongo': "mongodb://Usrlive93:Uje2Op304Ye@168.1.114.232:27017/Topperqlive",
	'port': 5003
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('cloudinary config', 'cloudinary://637254884144133:pKLHI8Db6pZoahj9ylqoFYBhd1g@topperq' );

// Load your project's Routes
keystone.set('routes', require('./routes'));

// set admin path (i.e, /keystone to /admin)
keystone.set('admin path' , "admin")

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'blogusers',
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();