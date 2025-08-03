import request from 'supertest';
import app from '../../../index.js';

const Methods = {
    Post: "POST"
}

const sendRequest = async (path, method, reqBody, authHeader = "") => {
    const req = request(app);
    
    switch (method) {
        case Methods.Post:
            return await req
                .post(path)
                .send(reqBody)
                .set('Accept', 'application/json')
                .set('Authorization', authHeader);
    
        default:
            return;
    }
}

export {
    Methods,
    sendRequest
}