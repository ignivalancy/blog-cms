var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Blogusers = new keystone.List('Blogusers');

Blogusers.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Blogusers.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Blogusers.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Blogusers.defaultColumns = 'name, email, isAdmin';
Blogusers.register();
