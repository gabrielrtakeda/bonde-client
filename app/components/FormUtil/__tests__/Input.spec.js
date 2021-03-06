import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Input } from './../'

describe('/app/components/FormUtil/Input', () => {
  let wrapper
  const props = {
    uid: 'foo',
    type: 'text',
    label: 'Foo Bar Label',
    placeholder: 'Foo Bar Placeholder'
  }

  beforeEach(() => {
    wrapper = shallow(<Input {...props} />)
  })

  it('should render input with expected id', () => {
    expect(wrapper.find('input').props().id).to.equal(`input-${props.uid}`)
  })

  it('should render input with expected type', () => {
    expect(wrapper.find('input').props().type).to.equal(props.type)
  })

  it('should render label with expected text', () => {
    expect(wrapper.find('label').text()).to.equal(props.label)
  })

  it('should render input with expected placeholder', () => {
    expect(wrapper.find('input').props().placeholder).to.equal(props.placeholder)
  })

  describe('default props', () => {
    let unrenderedProps
    before(() => {
      unrenderedProps = wrapper.unrendered.props
    })

    it('should render input with default onChange prop as function', () => {
      expect(unrenderedProps.onChange).to.be.func
    })

    it('should render input with default required prop as false', () => {
      expect(unrenderedProps.required).to.be.false
    })

    it('should render input with default show prop as true', () => {
      expect(unrenderedProps.show).to.be.true
    })

    it('should render input with default classes prop as array', () => {
      expect(unrenderedProps.classes).to.be.array
    })
  })

})
