'use strict';

module.exports = {
    emailConfig: {
        host: '',
        port: 26,
        secure: false,
        ignoreTLS: true,
        auth: {
            user: '',
            pass: ''
        }
    },
    sender: '',
    emailTemplates: {
        'userActivation': {
            subject: '[LD-Reactor] You account is activated',
            text: 'You can now login to LD-Reactor by using the following link: \n https://github.com/ali1k/ld-reactor'
        }
    }
}
