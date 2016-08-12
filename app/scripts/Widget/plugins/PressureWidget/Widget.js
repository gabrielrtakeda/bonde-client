import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import * as Paths from '../../../Paths'

import { OverlayWidget } from '../../components'
import { PressureForm, TargetList, PressureCount } from './components'

/* TODO: Change static content by props
 * - title
 * - bgColor
 */
class PressureWidget extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { mobilization, widget, editable } = this.props
    const { main_color, title_text, button_text, email_subject, email_text } = widget.settings

    const targets = Array(3).fill({
      image: 'https://placeholdit.imgix.net/~text?txtsize=8&txt=50%C3%9750&w=50&h=50',
      name: 'Lúcia Regina Mendes Espagolla',
      office: 'Diretora Regional de Ensino Norte-1'
    })

    return (
      <OverlayWidget editable={editable} onClick={(e) => {
        if (e) e.preventDefault()
        if (editable) {
          this.context.router.transitionTo(
            Paths.formPressureWidget(mobilization.id, widget.id)
          )
        }
      }}>
        <div className="pressure-widget">
          <h2 className="center py2 px3 m0 white rounded-top" style={{backgroundColor: main_color}}>{title_text}</h2>
          <TargetList targets={targets} />
          <PressureForm
            buttonText={button_text}
            buttonColor={main_color}
            subject={email_subject}
            body={email_text}
            onSubmit={data => {
              console.log(data)
              alert(data)
            }}>
            <PressureCount total={12234} totalColor={main_color} />
          </PressureForm>
          <div className="bg-black mt1 rounded py1 px3">
            <p className="white m0">Caso você seja o alvo dessa mobilização,
            dê uma resposta publica clicando <a href="#" style={{color: main_color}}>aqui</a>.
            Ela será publicada nesta página</p>
          </div>
        </div>
      </OverlayWidget>
    )
  }
}

PressureWidget.propTypes = {
  editable: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

PressureWidget.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default PressureWidget