const token = require('../../config/examples/token');
const { request } = require('../../../libs/utilities');

// extractToken
describe('Request Utilities', () => {
    describe('extractToken', () => {
        it('Extracts token from the body of a request if present', () => {
            const data = { body: { token } };
    
            expect(request.extractToken(data)).toEqual(token);
        });
        
        it('Extracts token from authorization header of a request if present', () => {
            const data = { headers: { authorization: `Bearer ${token}` } };
    
            expect(request.extractToken(data)).toEqual(token);
        });
        
        it('Returns null if no token is provided', () => {
            const data = { body: {} };
    
            expect(request.extractToken(data)).toEqual(null);
        });
    });
});