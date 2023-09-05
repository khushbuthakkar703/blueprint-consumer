import request from '@api'

// *************** API to Schedule Blooprint *********************************
export async function scheduleBlooprint({ dispatch }, params) {
  let isSuccess = false
  dispatch('setLoading', true)
  await request
    .post(
      `/schedule/blooprints/${params['blooprintId']}`,
      params['requestBody']
    )
    .then(result => {
      if (result['data'] && result['data']['id']) {
        isSuccess = true
        dispatch('setToastMessage', {
          type: 'positive',
          caption: 'Schedule Blooprint',
          message: 'Blooprint Scheduled Successfully'
        })
      }
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return isSuccess
}

// *************** API to Get the Blooprint Schedule *********************************
export async function fetchBlooprintSchedule({ dispatch }, blooprintId) {
  let blooprintScheduleData = {}
  dispatch('setLoading', true)
  await request
    .get(`/schedule/blooprints/${blooprintId}`)
    .then(result => {
      blooprintScheduleData = result['data']
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return blooprintScheduleData
}

// *************** API to Fetch Task Status *********************************
export async function fetchTaskStatus({ dispatch }, params) {
  let taskStatus = {}
  let blooprintID = this.$router.history.current.params.blooprintId
  let taskId = this.$router.history.current.params.taskId
  if (!taskId) {
    taskId = params['taskId']
  }
  dispatch('setLoading', true)
  await request
    .get(`/schedule/blooprints/${blooprintID}/tasks/${taskId}/status`)
    .then(result => {
      taskStatus = result['data']
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return taskStatus
}

// *************** API to Mark Task AS Complete *********************************
export async function markTaskAsComplete({ dispatch }, params) {
  let isSuccess = false
  let blooprintId = this.$router.history.current.params.blooprintId
  let taskId = this.$router.history.current.params.taskId
  if (!taskId) {
    taskId = params['taskId']
    delete params['taskId']
  }
  dispatch('setLoading', true)
  await request
    .post(`/schedule/blooprints/${blooprintId}/tasks/${taskId}/status`, params)
    .then(result => {
      isSuccess = true
      dispatch('setToastMessage', {
        type: 'positive',
        caption: 'Mark As Complete',
        message: 'Task Marked as Completed'
      })
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return isSuccess
}

// *************** API to Schedule Blooprint Task *********************************
export async function scheduleBlooprintTask({ dispatch }, params) {
  let isSuccess = false

  let blooprintID = this.$router.history.current.params.blooprintId
  let taskID = this.$router.history.current.params.taskId
  dispatch('setLoading', true)
  await request
    .post(`/schedule/blooprints/${blooprintID}/tasks/${taskID}`, params)
    .then(result => {
      if (result['data'] && result['data']['attributes']) {
        isSuccess = true
        dispatch('setToastMessage', {
          type: 'positive',
          caption: 'Schedule Task',
          message: 'Task Scheduled Successfully'
        })
      }
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return isSuccess
}

// *************** API to Fetch All Tasks List *********************************
export async function fetchAllScheduledTasks({ dispatch }, params) {
  let tasksList = []
  dispatch('setLoading', true)
  await request
    .get(`/schedule/tasks`, params)
    .then(result => {
      if (result['data'] && result['data']['attributes']) {
        result['data']['attributes'].forEach((item, index) => {
          item['days'].forEach((day, i) => {
            tasksList.push({
              title: item['name'],
              start: day,
              end: day,
              id: index + '-' + i
            })
          })
        })
      }
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      } else {
        dispatch('isAPIResponseFailed', true)
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return tasksList
}

// *************** API to Fetch All Tasks List *********************************
export async function fetchAllDesktopScheduledTasks({ dispatch }, params) {
  let tasksList = []
  dispatch('setLoading', true)
  await request
    .get(`/schedule/tasks`, params)
    .then(result => {
      if (result['data'] && result['data']['attributes']) {
        result['data']['attributes'].forEach(item => {
          item['days'].forEach((day, i) => {
            if (tasksList.length > 0) {
              let count = 0
              tasksList.forEach(element => {
                // ********** Check for Duplicate Dates *********************
                if (
                  (element['start'] == day ||
                    element['end'] == day ||
                    element['days'].includes(day)) &&
                  element['title'] == item['name']
                ) {
                  count++
                }
              })
              if (count == 0) {
                let params = {
                  i: i,
                  day: day,
                  item: item,
                  tasksList: tasksList
                }
                let taskData = dispatch('calendarDateSetup', params)
                taskData.then(res => {
                  tasksList = res
                })
              }
            } else {
              let params = {
                i: i,
                day: day,
                item: item,
                tasksList: tasksList
              }
              let taskData = dispatch('calendarDateSetup', params)
              taskData.then(res => {
                tasksList = res
              })
            }
          })
        })
      }
    })
    .catch(error => {
      dispatch('redirectTo404Page', error)
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return tasksList
}

export function calendarDateSetup({ dispatch }, params) {
  let i = params['i']
  let day = params['day']
  let item = params['item']
  let tasksList = params['tasksList']

  let d1 = new Date(day)
  if (i + 1 < item['days'].length) {
    if (item['days'][i + 1]) {
      for (let j = 1; j < item['days'].length; j++) {
        let d2 = new Date(item['days'][i + j])
        if (
          d1.getFullYear() == d2.getFullYear() &&
          d1.getMonth() == d2.getMonth() &&
          d1.getDate() == d2.getDate() - j
        ) {
          let test = tasksList.findIndex(
            temp => temp.start == day && temp.title == item.name
          )
          // *************** Check for the date is already present in the list or not *********************
          if (test != -1) {
            tasksList[test]['end'] = item['days'][i + j]
            tasksList[test]['days'] = tasksList[test]['days'].concat(
              item['days'][i + j]
            )
          } else {
            let days = []
            days.push(day)
            days.push(item['days'][i + j])
            tasksList.push({
              title: item['name'],
              start: day,
              end: item['days'][i + j],
              days: days
            })
          }
        } else {
          tasksList.push({
            title: item['name'],
            start: day,
            end: day,
            days: [day]
          })
        }
      }
    }
  } else {
    tasksList.push({
      title: item['name'],
      start: day,
      end: day,
      days: [day]
    })
  }
  // ************ Fetching the unique records **********************
  tasksList = tasksList.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        t =>
          t.title === item.title && t.start === item.start && t.end === item.end
      )
  )
  return tasksList
}
// *************** API to Download the ICS File *********************************
export async function fetchCalendarIcsFile({ dispatch }, params) {
  let response = {}
  dispatch('setLoading', true)
  await request
    .get(`/schedule/blooprints/${params['blooprintId']}/calendar`)
    .then(result => {
      response = result['data']
    })
    .catch(error => {
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        })
      }
    })
    .finally(() => {
      dispatch('setLoading', false)
    })
  return response
}
