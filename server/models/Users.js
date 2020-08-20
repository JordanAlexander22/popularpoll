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
        created: {
            type: Date,
            default: Date.now()
        },
        polls: [{type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}]
    },
    

	{
		timestamps: true
    },
    

);

let SALT_WORK_FACTOR = 5;
// cannot use arrow function here 
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

userSchema.methods.validatePassword = async function validatePassword(data,cb) {
	return bcrypt.compare(data, this.password, (err, isMatch) => {
		if(err)
			return cb(err);
		else{
			if(!isMatch)
				return cb(null, isMatch);
			return cb(null, this);
		}
	});
};

const User = mongoose.model('User', userSchema);

module.exports = User;