function getSchedules(cb){
  return fetch(`api/schedules`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then((response) => response.json())
    .then(cb)
};

function getWorkers(cb){
  return fetch(`api/workers`, {
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
}

const Client = { getSchedules, postSchedule, updateSchedule, deleteSchedule, getWorkers };
export default Client;
