const messages = {
    login : { 
            requireCredential: 'Username and Password should not empty or invalid.',
            success: 'User authentication successful.',
            invalidCredential: 'Please enter valid credentials. Demo => Username: admin Password: admin123',
        },
    authMsg : {
        tokenErr : 'A token is required for authentication',
        invalidToken : 'Token is invalid or expired. Please do login again for fresh token. Token expire time is 2 hour once generated.',
    }
}
module.exports = messages;