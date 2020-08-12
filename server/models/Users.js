const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			validate: [ isEmail, 'invalid email' ]
		},

		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minLength: 3
		},

		password: {
			type: String,
			required: true,
			minlength: 5
        },

        polls: [{type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}]
    },
    

	{
		timestamps: true
    },
    

);

userSchema.pre('save', async function save(next) {
	if (!this.isModified('password')) return next();
	try {
		const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		this.password = await bcrypt.hash(this.password, salt);
		return next();
	} catch (err) {
		return next(err);
	}
});

userSchema.methods.validatePassword = async function validatePassword(data) {
	return bcrypt.compare(data, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;