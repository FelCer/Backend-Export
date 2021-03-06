var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    user: {
        email: String,
        password: String
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.user.password);
};

module.exports = mongoose.model('User', userSchema);