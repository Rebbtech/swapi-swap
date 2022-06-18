import Joi from 'joi';
import joi from 'joi';

export const createAdminValidation = (req, res, next) => {
    console.log(req.body);

    //server side validation
    const schema = Joi.object({
        fname: Joi.string().max(20).required().alphanum(),
        lname: Joi.string().max(20).required().alphanum(),
        email: Joi.string().max(25).email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(8).required(),
        dob: Joi.date(),
        phone: Joi.string().max(15),
        address: Joi.string().max(100),
        gender: Joi.string().max(6),
    });

    const value = schema.validate(req.body);

    if (value.error) {
        return res.json({
            status: 'error',
            message: value.error.message,
        });
    }
    next();
};

// {
//     fname: 'Bijay',
//     lname: 'Nagarkoti',
//     email: 'a@gmail.com',
//     password: 'ASDFJKL',
//     phone: '838383838',
//     address: 'Sydney',
//     gender: 'male'
//   }
