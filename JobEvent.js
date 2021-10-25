const EventEmitter = require('events');

class Job extends EventEmitter {
    constructor() {
        super();
        console.log('job constructor called');
        this.on('internship_started', () => {
            console.log('Please start internship from today');
        });
        this.openAccount();
    }

    openAccount() {
        this.emit('open_bank_account', 'Axis Bank');    
    }
}

module.exports = Job;