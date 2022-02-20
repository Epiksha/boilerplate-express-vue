const Joi = require('joi');

const { request: requestUtility } = require('../../libs/utilities');

const createSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    first_name: Joi.string().alphanum().min(2).max(20).required(),
    last_name: Joi.string().alphanum().min(2).max(20).required(),
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
    id: Joi.string().alphanum().required(),
    last_name: Joi.string().alphanum().min(2).max(40),
    password: Joi.string().alphanum().min(5),
}).min(2);

class UserValidator {
    validateCreate(request, response, next) {
        if (!request.body) {
            const responseBody = {
                errors: { default: 'No data passed in with the body of the request' },
            };

            response.status(422).send(responseBody);
        }

        const { error } = createSchema.validate(request.body);

        if (error) {
            const responseBody = {
                errors: {},
            };

            requestUtility.setJoiErrors(error, responseBody.errors);

            response.status(422).send(responseBody);
        }

        next();
    }

    validateDelete(request, response, next) {
        const formedRequest = {};

        if (request.params && request.params.id) {
            formedRequest.id = request.params.id;
        }

        const { error } = deleteSchema.validate(formedRequest);

        if (error) {
            const responseBody = {
                errors: {},
            };

            requestUtility.setJoiErrors(error, responseBody.errors);

            response.status(422).send(responseBody);
        }

        next();
    }

    validateGet(request, response, next) {
        const formedRequest = {};

        if (request.params && request.params.id) {
            formedRequest.id = request.params.id;
        }

        const { error } = getSchema.validate(formedRequest);
        
        if (error) {
            const responseBody = {
                errors: {},
            };

            requestUtility.setJoiErrors(error, responseBody.errors);

            response.status(422).send(responseBody);
        }

        next();
    }

    validateUpdate(request, response, next) {
        let formedRequest = {};

        if (request.body) {
            formedRequest = { ...request.body };
        }
        
        if (request.params && request.params.id) {
            formedRequest.id = request.params.id;
        }

        const { error } = updateSchema.validate(formedRequest);
        
        if (error) {
            const responseBody = {
                errors: {},
            };

            requestUtility.setJoiErrors(error, responseBody.errors);

            response.status(422).send(responseBody);
        }

        next();
    }
}

module.exports = new UserValidator;