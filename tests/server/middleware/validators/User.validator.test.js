const { UserValidator } = require('../../../../middleware/validators');

describe('User Request Validators', () => {
    describe('validateCreate()', () => {
        test('Valid request body passes', async () => {
            const request = {
                body: {
                    email: 'test@test.com',
                    first_name: 'Jonathan',
                    last_name: 'Smithson',
                    password: 'hello123',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateCreate(request, response, () => {});
    
            expect(status).toBeFalsy();
            expect(data).toBeFalsy();
        });
        
        test('No request body fails', async () => {
            const request = {};
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateCreate(request, response, () => {});
    
            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.default).toBeTruthy();
        });
        
        test('Invalid email fails', async () => {
            const request = {
                body: {
                    email: 'test',
                    first_name: 'Jonathan',
                    last_name: 'Smithson',
                    password: 'hello123',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateCreate(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.email).toBeTruthy();
        });
        
        test('Invalid first name fails', async () => {
            const request = {
                body: {
                    email: 'test@test.com',
                    first_name: 'J',
                    last_name: 'Smithson',
                    password: 'hello123',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateCreate(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.first_name).toBeTruthy();
        });
        
        test('Invalid last name fails', async () => {
            const request = {
                body: {
                    email: 'test@test.com',
                    first_name: 'Jonathan',
                    last_name: 'S',
                    password: 'hello123',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateCreate(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.last_name).toBeTruthy();
        });
        
        test('Invalid password fails', async () => {
            const request = {
                body: {
                    email: 'test@test.com',
                    first_name: 'Jonathan',
                    last_name: 'Smithson',
                    password: 'pass',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateCreate(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.password).toBeTruthy();
        });
    });
    
    describe('validateGet()', () => {
        test('Valid request passes', async () => {
            const request = {
                params: {
                    id: 'random123random456',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateGet(request, response, () => {});
    
            expect(status).toBeFalsy();
            expect(data).toBeFalsy();
        });
        
        test('No request id fails', async () => {
            const request = {};
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateGet(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.default).toBeTruthy();
        });
    });
    
    describe('validateUpdate()', () => {
        test('Valid request passes', async () => {
            const request = {
                params: {
                    id: 'random123random456',
                },
                body: {
                    email: 'changedemail@test.com',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateUpdate(request, response, () => {});
    
            expect(status).toBeFalsy();
            expect(data).toBeFalsy();
        });
        
        test('No request id fails', async () => {
            const request = {
                body: {
                    email: 'changedemail@test.com',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateUpdate(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.default).toBeTruthy();
        });

        test('No request body fails', async () => {
            const request = {
                params: {
                    id: 'random123random456',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateUpdate(request, response, () => {});

            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.default).toBeTruthy();
        });
    });

    describe('validateDelete()', () => {
        test('Valid request passes', async () => {
            const request = {
                params: {
                    id: 'random123random456',
                },
            };
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateDelete(request, response, () => {});

            expect(status).toBeFalsy();
            expect(data).toBeFalsy();
        });
        
        test('No request id fails', async () => {
            const request = {};
    
            let status;
            let data;
    
            const response = {
                status(statusCode) {
                    status = statusCode;
    
                    return {
                        send(tempData) {
                            data = tempData;
                        },
                    };
                },
            };
            
            UserValidator.validateDelete(request, response, () => {});
    
            expect(status).toBe(422);
            expect(data).toBeTruthy();
            expect(data.errors).toBeTruthy();
            expect(data.errors.default).toBeTruthy();
        });
    });
});