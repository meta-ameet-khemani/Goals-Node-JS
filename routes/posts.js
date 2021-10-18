const router = require('express')();
const verifyToken = require('../validations/token_validator');

router.get('/', verifyToken, (req, res) => {
    let tokenCreatedTime = new Date(req.user.iat * 1000);
    if (req.user.exp) {
        let tokenExpireTime = new Date(req.user.exp * 1000);
        timeDifference(tokenExpireTime, tokenCreatedTime);
    }
    res.send('posts');
});

function timeDifference(date1, date2) {
    let difference = date1.getTime() - date2.getTime();

    let daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    let hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    let minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60

    let secondsDifference = Math.floor(difference/1000);

    let expireTime = 'Token will expire in ';
    expireTime += daysDifference > 0 ? daysDifference + ' day/s ' : '';
    expireTime += hoursDifference > 0 ? hoursDifference + ' hour/s ' : '';
    expireTime += minutesDifference > 0 ? minutesDifference + ' minute/s ' : '';
    expireTime += secondsDifference > 0 ? secondsDifference + ' second/s ' : '';
    
    console.log(expireTime);
}

module.exports = router;