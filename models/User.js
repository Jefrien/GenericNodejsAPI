import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: [true, 'Nombre obligatorio'] },
    email: String,
    password: String,
    phone: Number,
    role: { type: String, default: 'user' },
    modules: { type: Array, default: [] },
    status: { type: Boolean, default: 'active' },
    creation_date: { type: Date, default: Date.now }
});

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = model('User', userSchema);

export default User;