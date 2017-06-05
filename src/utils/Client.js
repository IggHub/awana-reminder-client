import PhoneHelper from './PhoneHelpers';

function getSchedules(cb){
  return fetch(`api/schedules`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then((response) => response.json())
    .then(cb)
};

function getWorkers(cb, schedule_id = null){
  let workersUrl = (schedule_id === null) ? `api/workers` : `api/workers?schedule_id=${schedule_id}`
  return fetch(workersUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then((response) => response.json())
    .then(cb)
};

function getTexts(cb, schedule_id = null){
  let textsUrl = (schedule_id === null) ? `api/texts` : `api/texts?schedule_id=${schedule_id}`
  return fetch(textsUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then((response) => response.json())
    .then(cb)
};

function postSchedule(date, message, workersArray, cb) {
  return fetch(`api/schedules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: date,
      message: message,
      user_id: 1,
      worker_info: workersArray
    })
  }).then((response) => response.json())
    .then(cb);
};

function postWorker(workerName, workerPhone, scheduleId, cb) {
  let phone = PhoneHelper.condensePhone(workerPhone);
  return fetch('api/workers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: workerName,
      phone: phone,
      schedule_id: scheduleId//how do I pass the schedule's ID?
    })
  }).then((response) => response.json())
    .then(cb);
};
function postText(message, scheduleId, cb){
  return fetch(`api/texts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      schedule_id: scheduleId
    })
  }).then((response) => response.json())
    .then(cb);
};

function postMessage(message, newWorkers, messageDatetime){
  let phoneArray = newWorkers.map((worker) => {
    return PhoneHelper.condensePhone(worker.phone)
  }).filter((el) => {return el !== ""});

    return fetch(`text_it`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        phones: phoneArray,
        message_datetime: messageDatetime.getTime()
      })
    })
};

function updateSchedule(scheduleId, date, cb) {
  return fetch(`api/schedules/${scheduleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: date,
      user_id: 1
    })
  }).then((response) => response.json())
    .then(cb);
};

function updateWorker(name, phone, workerId, scheduleId, cb) {
  return fetch(`api/workers/${workerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      schedule_id: scheduleId
    })
  }).then((response) => response.json())
    .then(cb);
};

function deleteSchedule(scheduleId, cb){
  return fetch(`api/schedules/${scheduleId}`, {
    method: 'DELETE'
  }).then(cb);
};

function deleteWorker(workerId, cb){
  return fetch(`api/workers/${workerId}`, {
    method: 'DELETE'
  }).then(cb);
};

function deleteText(textId, cb){
  return fetch(`api/texts/${textId}`, {
    method: 'DELETE'
  }).then(cb);
};

const Client = {
    getSchedules,
    getWorkers,
    getTexts,
    updateSchedule,
    updateWorker,
    deleteSchedule,
    deleteWorker,
    deleteText,
    postSchedule,
    postWorker,
    postMessage,
    postText
  };

export default Client;
