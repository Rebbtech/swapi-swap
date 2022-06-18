import express from 'express';
import { createAdmin } from '../database/admin-model/Admin.model.js';
import { createAdminValidation } from '../middlewares/formValidation.middleware.js';
import { hashPassword } from '../helpers/bcrypt.helper.js';
const Router = express.Router();

Router.all('/', (req, res, next) => {
    console.log('From Admin Router');
    next();
});

Router.post('/', createAdminValidation, async (req, res) => {
    console.log(req.body);
    try {
        // TODO
        //encrypt password
        const hashPass = hashPassword(req.body.password);
        if (hashPass) {
            req.body.password = hashPass;

            console.log(hashPass);

            const result = await createAdmin(req.body);
            if (result._id) {
                //todo
                //create unique activation link adn email the link to user email

                return res.json({
                    status: 'success',
                    message:
                        'New admin has been successfully created! We have sent an email confirmation link to your email, please check and follow the instruction to activate the account. ',
                });
            }
        }
        res.json({
            status: 'error',
            message: 'Unable to create new admin!',
        });
    } catch (error) {
        let msg = 'Error, Unable to create new admin!';
        if (error.message.includes('E11000 duplicate key error collection')) {
            msg =
                'This email is already assigned to another user. Please try another one.';
        }
        res.json({
            status: 'error',
            message: msg,
        });
    }
});

export default Router;
