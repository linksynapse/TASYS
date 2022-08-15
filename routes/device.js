var express = require('express');
var router = express.Router();

const device = require('../services/registerDevice');

/* GET device listing. */
router.get('/cdata', async function(req, res, next) {
        var serial_number = req.query.SN;
        var push_version = req.query.pushver;
        var options = req.query.options;
        var host = req.header('Host')
        var connection = req.header('Connection');
        var user_agent = req.header('User-Agent');
        var type_of_api = req.header('Accept');
        var encoding_type = req.header('Accept-Charset');
        var device_language = req.header('Accept-Language');

        // Response data
        var registry = 'ok';
        var registryCode = 'A'*32;
        var serverVersion = '1.2.3';
        var serverName = 'TAS2ys';
        var pushProtVer = '';
        var ErrorDelay = 30;
        var RequestDelay = 30;
        var TransTimes = '00:00;14:00';
        var TransTables = 1;
        var SessionID = '';
        var TimeoutSec = 60;
        
        

        try{
          res.json(await device.getDeviceInfo('N/A', serial_number));
        }catch (err){
          console.error(err.message);
          next(err);
        }
});

module.exports = router;
