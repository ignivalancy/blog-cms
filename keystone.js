// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');
var cloudinary = require('cloudinary');

const configs = require("./config");
const cloudinaryConfigs = configs.cloudinary;
const CONST = configs.CONST;
const db = configs.db;

const mongoConnection = "mongodb://" + db.username +":"+db.password+"@"+ db.host + ":" + db.port + "/" + db.name;

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
	'mongo': mongoConnection,
	'port': 5003,
	// 'host':'168.1.114.232',
	'cloudinary secure':true,
	// 'env': 'production',
	'cloudinary config': { cloud_name: cloudinaryConfigs.cloud_name, api_key: cloudinaryConfigs.api_key, api_secret: cloudinaryConfigs.api_secret },
	'cookie secret': CONST.cookie_secret
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

cloudinary.config({ 
  cloud_name: cloudinaryConfigs.cloud_name, 
  api_key: cloudinaryConfigs.api_key, 
  api_secret: cloudinaryConfigs.api_secret
});


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
