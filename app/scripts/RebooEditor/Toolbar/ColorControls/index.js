import React, { Component, PropTypes } from 'react'
import { EditorState, Modifier } from 'draft-js'

import ColorPickerButton from './ColorPickerButton'

export default class ColorControls extends Component {
  constructor(props) {
    super(props)
    this.state = { color: null }
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps
    if (editorState !== this.props.editorState) {
      const currentStyle = editorState.getCurrentInlineStyle()
      const color = currentStyle.filter(value => value.startsWith('color')).last()
      if (color) {
        this.setState({
          color: color
            .replace('color:')
            .replace(';', '')
            .trim()
          })
      }
    }
  }

  onChangeColor(color) {
    const { editorState, setEditorState } = this.props

    const targetSelection = editorState.getSelection()
    if (!targetSelection.isCollapsed()) {
      const contentWithColor = Modifier.applyInlineStyle(
        editorState.getCurrentContent(),
        targetSelection,
        `color: rgba(${color.r},${color.g},${color.b},${color.a});`
      )

      const editorStateWithColor = EditorState.push(editorState, contentWithColor, 'change-inline-style')
      setEditorState(editorStateWithColor)
    }
  }

  render() {

    const { buttonClassName, theme } = this.props

    return (
      <div className="colorControls">
        <ColorPickerButton
          theme={theme}
          className={buttonClassName}
          color={this.state.color}
          onRemoveColor={() => {}}
          onChangeColor={this.onChangeColor.bind(this)}
        />
      </div>
    )
  }
}

ColorControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string,
  theme: PropTypes.string,
}


export const customStyleFn = (style) => {
  const output = {}
  const color = style.filter(value => value.startsWith('color')).last()
  if (color) {
    output.color = color
      .replace('color:', '')
      .replace(';', '')
      .trim()
  }
  return output
}
