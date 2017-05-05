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

function postSchedule(date, cb) {
  return fetch(`api/schedules`, {
    method: 'POST',
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

function postWorker(workerName, workerPhone, scheduleId, cb) {
  return fetch('api/workers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: workerName,
      phone: workerPhone,
      schedule_id: scheduleId//how do I pass the schedule's ID?
    })
  }).then((response) => response.json())
    .then(cb);
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

function deleteSchedule(scheduleId, cb){
  return fetch(`api/schedules/${scheduleId}`, {
    method: 'DELETE'
  }).then(cb);
};

const Client = {
    getSchedules,
    postSchedule,
    updateSchedule,
    deleteSchedule,
    getWorkers,
    postWorker
  };

export default Client;
