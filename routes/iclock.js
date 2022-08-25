const express = require('express');
const semver = require('semver');
const router = express.Router();

const apis = require('../services/devices');
const server_config = require('../component/config');

/* GET device listing. */
router.get('/cdata', async function(req, res, next) {
  try{
    // get parameter from url
    const serial_number = req.query.SN;
    const push_version = req.query.pushver;
    const options = req.query.options;
    const push_options_flag = req.query.PushOptionsFlag;

    // check push server version
    // valid check server protocol version
    const pushProtVer = semver.valid(server_config.protocol_version);
    if(pushProtVer == null)
      throw new Error('Server Protocol version is not valid');
    // valid check client protocol version
    push_version = semver.valid(push_version);
    if(push_version == null)
      throw new Error('Client Protocol version is not valid');

    // compare version
    if(!semver.satisfies(push_version, '='+ pushProtVer))
      throw new Error('Not Match client and server protocol version');

    // compare options
    if(options != 'all')
      throw new Error('API permit is not allow');

    if(push_options_flag != 1)
      throw new Error('Device push is disabled');

    // check device serial number registered in server
    // if not register response OK
    const data = apis.GetDeviceInfoFromAuth(null, serial_number);
    res.send(data);

  }catch (err){
    console.error(err.message);
    res.send('OK');
  }
});

router.post('/cdata', async function (req, res, next){
  try{
    console.log('/cdata body');
    console.log(req.body);

    const serial_number = req.query.SN;
    const table = req.query.table;

    res.send('OK');
  }catch(err){
    console.error(err.message);
    next(err.message);
  }
});


router.post('/registry', async function (req, res, next){
  try{
    const data = await apis.GetDeviceRegistryCode(null, req.query.SN);
    res.send(data);
  }catch (err){
    console.error(err.message);
    next('OK');
  }
});

router.get('/ping', async function (req, res, next){
  try{
    if(await apis.SetDeviceUptimeFromAuth(null, req.query.SN)){
      res.send('OK');
    }else{
      throw new Error('Ping Heartbeat error.');
    }
    
  }catch (err){
    console.error(err.message);
    next(err.message);
  }
});

router.get('/getrequest', async function (req, res, next){
  try{
    // update heatbeat
    if(!(await apis.SetDeviceUptimeFromAuth(null, req.query.SN)))
      throw new Error('GetRequest Heartbeat error');

    // send device command
    res.send(await apis.GetDeviceCommand(null, req.query.SN));
    
  }catch (err){
    console.error(err.message);
    next(err.message);
  }
});

router.post('/devicecmd', async function (req, res, next){
  try{
    // debug for client data
    console.log('/devicecmd body');
    console.log(req.body);

    var arguments = {};

    req.body.split('&').forEach(element => {
      const temp = element.split('=');
      arguments[temp[0]] = temp[1];
    });

    console.log(arguments)

    if(!(await apis.DeleteDeviceCommand(null, req.query.SN, arguments.ID)))
      throw new Error('Can\'t find command');

    res.send('OK');
  }catch (err){
    console.error(err.message);
    next(err.message);
  }
});

router.post('/querydata', async function (req, res, next){
  try{
    console.log(req.body);

    const serial_number = req.query.SN;
    const data_type = req.query.type;
    const cmd_id = req.query.cmdid;
    const tablename = req.query.tablename;
    const count = req.query.count;
    const packcnt = req.query.packcnt;
    const packidx = req.query.packidx;

    if(!(await apis.DeleteDeviceCommand(null, serial_number, cmd_id)))
      throw new Error('Can\'t find command');

    res.send('user=1');
  }catch (err){
    console.error(err.message);
    next(err.message);
  }
});

router.post('/push', async function(req, res, next){
  try{
    res.send(await apis.GetDeviceConfig(null, req.query.SN));
  }catch (err){
    console.error(err.message);
    next(err.message);
  }
});



module.exports = router;
