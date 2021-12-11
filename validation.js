//validation
const Joi = require('joi');
const { schema } = require('./model/user');

//Register validation
const registerValidation = (data) =>{
    const schema = Joi.object({
        nama_user: Joi.string().required(),
        email_user: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    })
    return schema.validate(data);
};

const loginValidation = (data) =>{
    const schema = Joi.object({
        email_user: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    })
    return schema.validate(data);
};

const kolamRegisValidation = (data) =>{
    const schema = Joi.object({
        id_user: Joi.string().required(),
        nama_kolam: Joi.string().required(),
        kode_device: Joi.string().required(),
    })

    return schema.validate(data);
}

const kolamEditValidation = (data) =>{
    const schema = Joi.object({
        nama_kolam: Joi.string().required(),
        kode_device: Joi.string().required(),
    })

    return schema.validate(data);
}

const inputHistValidation = (data) =>{
    const schema = Joi.object({
        token: Joi.string().required(),
        water_temp: Joi.number().required(),
        ph_meter: Joi.number().required(),
    })

    return schema.validate(data);
}

const inputCommentValidation = (data) =>{
    const schema = Joi.object({
        desc_comment: Joi.string().required(),
    })

    return schema.validate(data);
}

const getHistValidation = (data) =>{
    const schema = Joi.object({
        kode_device: Joi.string().required(),
    })

    return schema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.kolamRegisValidation = kolamRegisValidation;
module.exports.kolamEditValidation = kolamEditValidation;
module.exports.inputHistValidation = inputHistValidation;
module.exports.inputCommentValidation = inputCommentValidation;
module.exports.getHistValidation = getHistValidation;