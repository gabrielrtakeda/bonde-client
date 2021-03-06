import { createFormReducer } from 'redux-form'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
/*import mobilizations from './../../app/scripts/reducers/mobilizations'*/
import blocks from './../../app/scripts/reducers/blocks'
import blockReducer from '../../app/scripts/Block/BlockReducer'
import colorPicker from '../../app/components/ColorPicker/ColorPickerReducer'
import widgets from './../../app/scripts/Widget/reducer'
import auth from './../../app/scripts/reducers/auth'
import mobilizationEditor from './../../app/scripts/reducers/mobilizationEditor'
import organizations from './../../app/scripts/reducers/organizations'
import matches from './../../app/scripts/Widget/plugins/Match/reducer'
import exportDataClip from './../../app/scripts/reducers/exportDataClip'

import mobilization from './../../app/scripts/Mobilization/MobilizationReducer'

/*const mobilizationBasics = createFormReducer('mobilizationBasics', ['name', 'goal'])
const mobilizationCity = createFormReducer('mobilizationCity', ['colorScheme'])
const mobilizationAnalytics = createFormReducer('mobilizationAnalytics', ['id'])
const mobilizationFonts = createFormReducer('mobilizationFonts', ['headerFont', 'bodyFont'])
const mobilizationCustomDomain = createFormReducer('mobilizationCustomDomain', ['customDomain'])
const loginForm = createFormReducer('loginForm', ['email', 'password'])
const widgetForm = createFormReducer('widgetForm', ['callToAction', 'buttonText', 'countText', 'emailText'])

const mobilizationSharing = createFormReducer('mobilizationSharing', [
  'facebook_share_title',
  'facebook_share_description',
  'facebook_share_image'
])*/

export default combineReducers({
  form: formReducer,
  mobilization,
  /*mobilizationBasics,
  mobilizationCity,
  mobilizationAnalytics,
  mobilizationFonts,
  mobilizationSharing,
  mobilizationCustomDomain,*/
  blocks,
  blockReducer,
  colorPicker,
  widgets,
  /*loginForm,
  widgetForm,*/
  auth,
  mobilizationEditor,
  organizations,
  matches,
  exportDataClip
})
