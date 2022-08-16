const CREATE_DEVICE_INFO = "INSERT INTO devices (serial_number) VALUES (?)";
const READ_DEVICE_INFO = "SELECT object_id, serial_number, registry_code, error_delay, request_delay, real_time, trans_times, trans_interval FROM devices WHERE object_id=? OR serial_number=?";
const UPDATE_DEVICE_INFO = "UPDATE devices SET serial_number=?, error_delay=?, request_delay=?, real_time=?, trans_times=?, trans_interval=? WHERE object_id=?";
const DELETE_DEVICE_INFO = "DELETE FROM devices WHERE object_id=?";

var db = {
    C: CREATE_DEVICE_INFO,
    R: READ_DEVICE_INFO,
    U: UPDATE_DEVICE_INFO,
    D: DELETE_DEVICE_INFO
};

module.exports = {
    db
};