var express = require('express');
var semver = require('semver');
var router = express.Router();

var device = require('../services/registerDevice');
var server_config = require('../config/server');

/* GET device listing. */
router.get('/cdata', async function(req, res, next) {
  try{
    // get parameter from url
    var serial_number = req.query.SN;
    var push_version = req.query.pushver;
    var options = req.query.options;
    var push_options_flag = req.query.PushOptionsFlag;

    // get parameter from header
    var host = req.header('Host')
    var connection = req.header('Connection');
    var user_agent = req.header('User-Agent');
    var type_of_api = req.header('Accept');
    var encoding_type = req.header('Accept-Charset');
    var device_language = req.header('Accept-Language');

        
    // check push server version
    // valid check server protocol version
    var pushProtVer = semver.valid(server_config.protocol_version);
    if(pushProtVer == null)
      throw new Error('Server Protocol version is not valid');
    // valid check client protocol version
    push_version = semver.valid(push_version);
    if(push_version == null)
      throw new Error('Client Protocol version is not valid');

    // compare version
    if(!semver.satisfies(push_version, '='+ pushProtVer))
      throw new Error('Not Match client and server protocol version');

    console.log('Version Confirm');

    // compare options
    if(options != 'all')
      throw new Error('API permit is not allow');

    if(push_options_flag != 1)
      throw new Error('Device push is disabled');

    console.log('Parameter Confirm');

    // check device serial number registered in server
    // if not register response OK
    const di = await device.Read('N/A', serial_number);
    console.log(di);
    if(di.length == 0)
      throw new Error('OK')
        
    // pass registered device
    var ret = '';
    ret += 'registry=ok ';
    ret += 'RegistryCode=' + di[0].registry_code + '\n';
    ret += 'ServerVersion=' + server_config.server_version + '\n';
    ret += 'ServerName=' + server_config.server_name + '\n';
    ret += 'PushProtVer=' + server_config.protocol_version + '\n';
    ret += 'ErrorDelay=' + di[0].error_delay + '\n';
    ret += 'RequestDelay=' + di[0].request_delay + '\n';
    ret += 'TransTimes=' + di[0].trans_times + '\n';
    ret += 'TransInterval=' + di[0].trans_interval + '\n';
    ret += 'TransTables=\'User Transaction\'\n';
    ret += 'Realtime=' + di[0].real_time + '\n';
    ret += 'SessionID=123123\n';
    ret += 'TimeoutSec=' + server_config.timeout + '\n';

    res.send(ret);
  }catch (err){
    console.error(err.message);
    next(err.message);
  }
});


router.post('/registry', function (req, res, next){
  try{
    var serial_number = req.query.SN;
    
    res.send('OK');
  }catch (err){
    console.error(err.message);
    next(err.message);
  }
});

router.get('/ping', function (req, res, next){
  try{
    
  }catch (err){
    console.error(err.message);
    next(err.message);
  }
});



module.exports = router;
