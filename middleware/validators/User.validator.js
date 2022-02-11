const Joi = require('joi');

const createSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    first_name: Joi.string().alphanum().min(5).max(20).required(),
    last_name: Joi.string().alphanum().min(5).max(20).required(),
    password: Joi.string().alphanum().min(5).max(40).required(),
});

const deleteSchema = Joi.object().keys({
    id: Joi.string().alphanum().required(),
});

const getSchema = Joi.object().keys({
    id: Joi.string().alphanum().required(),
});

const updateSchema = Joi.object().keys({
    email: Joi.string().email(),
    first_name: Joi.string().alphanum().min(2).max(40),
    id: Joi.string().alphanum(),
    last_name: Joi.string().alphanum().min(2).max(40),
    password: Joi.string().alphanum().min(5),
}).min(1);

class UserValidator {
    validateCreate(request, response, next) {
        const { error } = createSchema.validate(request.body);

        if (error) {
            response.status(422).json({
                message: error.details.map(({ message }) => message),
                data: request.body,
                statusCode: 422,
            });
        }

        next();
    }

    validateDelete(request, response, next) {
        const formedRequest = { id: request.params.id };

        const { error } = deleteSchema.validate(formedRequest);
        
        if (error) {
            response.status(422).json({
                message: error.details.map(({ message }) => message),
                data: formedRequest,
                statusCode: 422,
            });
        }

        next();
    }

    validateGet(request, response, next) {
        const formedRequest = { id: request.params.id };

        const { error } = getSchema.validate(formedRequest);
        
        if (error) {
            response.status(422).json({
                message: error.details.map(({ message }) => message),
                data: formedRequest,
                statusCode: 422,
            });
        }

        next();
    }

    validateUpdate(request, response, next) {
        const formedRequest = {
            ...request.body,
            id: request.params.id,
        };

        const { error } = updateSchema.validate(formedRequest);
        
        if (error) {
            response.status(422).json({
                message: error.details.map(({ message }) => message),
                data: formedRequest,
                statusCode: 422,
            });
        } else {
            next();
        }
    }
}

module.exports = new UserValidator;