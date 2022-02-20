const token = require('../../config/examples/token');
const { request: requestUtility } = require('../../../libs/utilities');

describe('Request Utilities', () => {
    describe('extractToken', () => {
        it('Extracts token from the body of a request if present', () => {
            const data = { body: { token } };
    
            expect(requestUtility.extractToken(data)).toEqual(token);
        });
        
        it('Extracts token from authorization header of a request if present', () => {
            const data = { headers: { authorization: `Bearer ${token}` } };
    
            expect(requestUtility.extractToken(data)).toEqual(token);
        });
        
        it('Returns null if no token is provided', () => {
            const data = { body: {} };
    
            expect(requestUtility.extractToken(data)).toEqual(null);
        });
    });
    
    describe('setJoiErrors', () => {
        it('Every condition saves correct error', () => {
            const error = {
                details: [
                    { message: 'email is too long' },
                    { message: 'email is too short' },
                    { message: 'password is too long' },
                    { message: 'password is too short' },
                    { message: 'first_name is too long' },
                    { message: 'first_name is too short' },
                    { message: 'last_name is too long' },
                    { message: 'last_name is too short' },
                    { message: 'id is too long' },
                    { message: 'id is too short' },
                ],
            };

            const responseErrors = {};

            requestUtility.setJoiErrors(error, responseErrors);

            expect(responseErrors.email).toBeTruthy();
            expect(responseErrors.email).toContain('email is too short');
            expect(responseErrors.email).toContain('email is too long');

            expect(responseErrors.password).toBeTruthy();
            expect(responseErrors.password).toContain('password is too short');
            expect(responseErrors.password).toContain('password is too long');

            expect(responseErrors.first_name).toBeTruthy();
            expect(responseErrors.first_name).toContain('first_name is too short');
            expect(responseErrors.first_name).toContain('first_name is too long');

            expect(responseErrors.last_name).toBeTruthy();
            expect(responseErrors.last_name).toContain('last_name is too short');
            expect(responseErrors.last_name).toContain('last_name is too long');

            expect(responseErrors.default).toBeTruthy();
            expect(responseErrors.default).toContain('id is too short');
            expect(responseErrors.default).toContain('id is too long');
        });
    });
});