const moment = require('moment')
//logger
const logger = (req,res,next)=>{
    console.log(`${req.protocol}//${req.get('host')}${req.originalUrl}:${moment()}`);// we get the api using this log
    next();
};
module.exports = logger;