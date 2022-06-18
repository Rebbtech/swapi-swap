import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
            default: 'active',
        },
        fname: {
            type: String,
            required: true,
            default: '',
            max: 20,
        },
        lname: {
            type: String,
            required: true,
            default: '',
            max: 20,
        },
        dob: {
            type: Date,
        },
        email: {
            type: String,
            required: true,
            default: '',
            max: 25,
            unique: true,
            index: 1,
        },
        isEmailConfirmed: {
            type: Boolean,
            required: true,
            default: false,
        },
        password: {
            type: String,
            required: true,
            default: '',
            min: 8,
        },
        phone: {
            type: String,
            max: 10,
        },

        address: {
            type: String,
            max: 100,
        },
        gender: {
            type: String,
        },
        role: {
            type: String,
            default: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const admin = mongoose.model('Admin', AdminSchema);
export default admin;
