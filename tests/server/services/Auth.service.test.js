const AuthService = require('../../../services/Auth.service');

describe('AuthService', () => {
    it('Catches errors correctly', async () => {
        const data = await AuthService.login();

        console.log(data);
    });
});