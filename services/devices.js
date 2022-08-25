const mysql = require('mysql2/promise');
const config = require('../component/config');

const mapper = require('../component/mapper/device/properties');

async function execute(query, params) {
    try{
        const connection = await mysql.createConnection(config.db);
        const [rows] = await connection.execute(query, params);
        connection.end();
        return rows;
    } catch(err) {
        console.log(err.message);
        return [];
    }
}

async function GetDeviceInfoFromAuth(object_id = 'N/A', serial_number = 'N/A'){
    try{
        const rows = await execute(mapper.READ_DEVICE_INFO, [object_id, serial_number]);
        const data = rows;

        if(data.length != 1){
            if(await RegistryDevice(serial_number))
                throw new Error('No record device. success apply device serialnumber');
            else
                throw new Error('No record device. fail apply device serialnumber');
        }
            

        return 'registry=ok ' + 'RegistryCode=' + data[0].registry_code + ' ServerVersion=' + config.version + ' ServerName=' + config.name + ' PushProtVer=' + config.protver;
    } catch(err) {
        console.log(err.message);
        return 'OK';
    }
}

async function RegistryDevice(serial_number){
    try{
        const rows = await execute(mapper.CREATE_DEVICE_INFO, [serial_number]);
        const data = rows;
    
        if(data.affectedRows != 1)
            return false;
        else
            return true;
    } catch (err) {
        return false;
    }
}

async function GetDeviceRegistryCode(object_id = 'N/A', serial_number = 'N/A'){
    try{
        const rows = await execute(mapper.READ_DEVICE_INFO, [object_id, serial_number]);
        const data = rows;

        if(data.length != 1){
            throw new Error('No record device.');
        }

        return 'RegistryCode=' + data[0].registry_code;
    } catch(err) {
        console.log(err.message);
        return 'OK';
    }
}

async function GetDeviceConfig(object_id = 'N/A', serial_number = 'N/A'){
    try{
        const rows = await execute(mapper.READ_DEVICE_INFO, [object_id, serial_number]);
        const data = rows;

        if(data.length != 1){
            throw new Error('No record device.');
        }

        return 'ServerVersion=' + server_config.server_version 
        + ' ServerName=' + server_config.server_name 
        + ' ErrorDelay=' + di[0].error_delay 
        + ' RequestDelay=' + di[0].request_delay
        + ' TransTimes=' + di[0].trans_times
        + ' TransInterval=' + di[0].trans_interval
        + ' TransTables=\'User Transaction\''
        + ' Realtime=' + di[0].real_time
        + ' SessionID='+ Math.random()
        + ' TimeoutSec=' + server_config.timeout;

    } catch(err) {
        console.log(err.message);
        return 'OK';
    }
}

async function SetDeviceUptimeFromAuth(object_id = 'N/A', serial_number = 'N/A'){
    try{
        const rows = await execute(mapper.UPDATE_DEVICE_UPTIME, [object_id, serial_number]);
        const data = rows;
        
        if(data.affectedRows != 1)
            return false;
        else
            return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function GetDeviceCommand(object_id = 'N/A', serial_number = 'N/A'){
    try{
        const rows = await execute(mapper.READ_DEVICE_COMMAND, [object_id, serial_number]);
        const data = rows;
    
        if(data.length != 1){
            return 'OK';
        }else{
            return 'C:' + data[0].command_id + ':' + data[0].command_type + ' ' + data[0].command_target + ' ' + data[0].params;
        }
    } catch(err) {
        return 'OK';
    }
}

async function DeleteDeviceCommand(object_id = 'N/A', serial_number = 'N/A', command_id){
    try{
        const rows = await execute(mapper.DELETE_DEVICE_COMMAND, [object_id, serial_number, command_id]);
        const data = rows;
    
        if(data.affectedRows != 1)
            return false;
        else
            return true;
    } catch(err) {
        return false;
    }
    
}

module.exports = {
    GetDeviceInfoFromAuth,
    SetDeviceUptimeFromAuth,
    GetDeviceRegistryCode,
    GetDeviceConfig,
    GetDeviceCommand,
    DeleteDeviceCommand
};