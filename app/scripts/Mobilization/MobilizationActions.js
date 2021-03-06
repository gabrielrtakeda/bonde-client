import superagent from 'superagent'

// Constants

export const REQUEST_FETCH_MOBILIZATIONS = 'REQUEST_FETCH_MOBILIZATIONS'
export const SUCCESS_FETCH_MOBILIZATIONS = 'SUCCESS_FETCH_MOBILIZATIONS'
export const FAILURE_FETCH_MOBILIZATIONS = 'FAILURE_FETCH_MOBILIZATIONS'

export const SET_CURRENT_MOBILIZATION = 'SET_CURRENT_MOBILIZATION'
export const ADD_MOBILIZATION = 'ADD_MOBILIZATION'
export const EDIT_MOBILIZATION = 'EDIT_MOBILIZATION'

export const PROGRESS_UPLOAD_FACEBOOK_IMAGE = 'PROGRESS_UPLOAD_FACEBOOK_IMAGE'
export const FINISH_UPLOAD_FACEBOOK_IMAGE = 'FINISH_UPLOAD_FACEBOOK_IMAGE'

export const SET_MOBILIZATION_MORE_MENU_ACTIVE_INDEX = 'SET_MOBILIZATION_MORE_MENU_ACTIVE_INDEX'

// Actions
// TODO: Buscar uma maneira mais clara de fazer isso

export const fetchMobilizations = (queryFilter = {}) => ({
  types: [
    REQUEST_FETCH_MOBILIZATIONS,
    SUCCESS_FETCH_MOBILIZATIONS,
    FAILURE_FETCH_MOBILIZATIONS
  ],
  promise: () => new Promise((resolve, reject) => {
    superagent
      .get(`${process.env.API_URL}/mobilizations`)
      .send(queryFilter)
      .end((err, res) => {
        if (err || !res.ok) reject(err || res.body)
        else resolve(res.body)
      })
  })
})

export const setCurrentMobilizationId = currentId => ({
  type: SET_CURRENT_MOBILIZATION,
  currentId: !isNaN(parseInt(currentId, 10)) ? parseInt(currentId, 10) : undefined
})

export const addMobilization = mobilization => ({ type: ADD_MOBILIZATION, mobilization })

export const addMobilizationAsync = (mobilization, next = null) => (dispatch, getState, request) => {
  const { credentials } = getState().auth

  return new Promise((resolve, reject) => {
    request
      .post(`/mobilizations`, { mobilization }, { headers: credentials })
      .then(response => {
          const { data } = response
          dispatch(addMobilization(data))
          // TODO: Update react-router and install react-router-redux to make only a push in history.
          // See: https://github.com/reactjs/react-router-redux#pushlocation-replacelocation-gonumber-goback-goforward
          next && typeof next === 'function' && next(data)
          return resolve()
      })
      .catch(error => reject({ _error: `Response ${error}` }))
  })
}

export const editMobilization = mobilization => ({ type: EDIT_MOBILIZATION, mobilization })

export const editMobilizationAsync = (mobilization, next = null) => (dispatch, getState, request) => {
  const { credentials } = getState().auth

  return new Promise((resolve, reject) => {
    request
      .put(`/mobilizations/${mobilization.id}`, { mobilization }, { headers: credentials })
      .then(response => {
        const { data } = response
        dispatch(editMobilization(data))
        // TODO: Update react-router and install react-router-redux to make only a push in history.
        // See: https://github.com/reactjs/react-router-redux#pushlocation-replacelocation-gonumber-goback-goforward
        next && typeof next === 'function' && next(data)
        return resolve()
      })
      .catch(error => reject({ _error: `Response ${error}` }))
  })
}

export const mobilizationsIsLoaded = state => state.mobilization.loaded
export const progressUploadFacebookImage = () => ({ type: PROGRESS_UPLOAD_FACEBOOK_IMAGE })
export const finishUploadFacebookImage = () => ({ type: FINISH_UPLOAD_FACEBOOK_IMAGE })
export const setMobilizationMoreMenuActiveIndex = index => ({
  type: SET_MOBILIZATION_MORE_MENU_ACTIVE_INDEX,
  index
})
