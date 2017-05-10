import {expect} from 'chai'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import {describeComponent} from 'ember-mocha'
import sinon from 'sinon'
import {$hook, initialize} from 'ember-hook'

function render () {
  this.render(hbs`
    {{frost-select-outlet}}
    {{frost-bunsen-form
      bunsenModel=bunsenModel
      bunsenView=bunsenView
      hook=hook
      onChange=onChange
    }}
  `)
}

describe('Integration: Component / frost-object-browser', function () {
  describeComponent('frost-object-browser', {
    integration: true
  },
  function () {
    let props, sandbox

    beforeEach(function () {
      initialize()
      sandbox = sinon.sandbox.create()

      props = {
        bunsenModel: undefined,
        bunsenView: undefined,
        hook: 'my-form',
        onChange: sandbox.spy()
      }

      this.setProperties(props)
    })

    afterEach(function () {
      sandbox.restore()
    })

    describe('when filtering with checkbox array', function () {
      beforeEach(function () {
        this.set('bunsenModel', {
          properties: {
            checkboxarray: {
              items: {
                enum: ['checkbox1', 'checkbox2', 'checkbox3'],
                type: 'string'
              },
              type: 'array',
              'uniqueItems': true
            }
          },
          type: 'object'
        })
        this.set('bunsenView', {
          cellDefinitions: {
            main: {
              children: [
                {
                  children: [
                    {
                      model: 'checkboxarray',
                      renderer: {
                        name: 'checkbox-array'
                      }
                    }
                  ],
                  label: 'Checkbox-array',
                  collapsible: true
                }
              ],
              label: 'Refine by'
            }
          },
          cells: [
            {
              extends: 'main'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })
      describe('and checkboxes are clicked', function () {
        beforeEach(function () {
          render.call(this)
        })
        it('normalizes as expected', function () {
          $hook('-checkbox-input').trigger('click')

          expect(
              props.onChange.lastCall.args[0].checkboxarray,
              'checkbox array filter value is normalized'
            ).to.have.members(['checkbox1', 'checkbox2', 'checkbox3'])
        })
      })
    })

    describe('when filtering with text input', function () {
      beforeEach(function () {
        this.set('bunsenModel', {
          properties: {
            text: { type: 'string' }
          },
          type: 'object'
        })
        this.set('bunsenView', {
          cellDefinitions: {
            main: {
              children: [
                {
                  children: [
                    {
                      model: 'text'
                    }
                  ],
                  label: 'Text',
                  collapsible: true
                }
              ],
              label: 'Refine by'
            }
          },
          cells: [
            {
              extends: 'main'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })
      describe('and text is filled in', function () {
        beforeEach(function () {
          render.call(this)
        })
        it('normalizes as expected', function () {
          $hook('my-form-text')
            .first()
            .find('input')
            .val('test')
            .trigger('input')

          expect(
              props.onChange.lastCall.args[0].text,
               'text input filter value is normalized'
          ).to.equal('test')
        })
      })
    })

    describe('when filtering with select', function () {
      beforeEach(function () {
        this.set('bunsenModel', {
          properties: {
            select: {
              enum: ['select1', 'select2', 'select3'],
              type: 'string'
            }
          },
          type: 'object'
        })
        this.set('bunsenView', {
          cellDefinitions: {
            main: {
              children: [
                {
                  children: [
                    {
                      model: 'select',
                      renderer: {
                        name: 'select'
                      }
                    }
                  ],
                  label: 'Select',
                  collapsible: true
                }
              ],
              label: 'Refine by'
            }
          },
          cells: [
            {
              extends: 'main'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })
      describe('and a selection is made', function () {
        beforeEach(function () {
          render.call(this)
        })
        it('normalizes as expected', function () {
          $hook('my-form-select').find('.frost-select').click()
          $hook('my-form-select-item', {index: 0}).trigger('mousedown')

          expect(
              props.onChange.lastCall.args[0],
               'select filter value is normalized'
          ).to.eql({
            select: 'select1'
          })
        })
      })
    })

    describe('when filtering with multi-select', function () {
      beforeEach(function () {
        this.set('bunsenModel', {
          properties: {
            multiselect: {
              items: {
                enum: ['multiselect1', 'multiselect2', 'multiselect3'],
                type: 'string'
              },
              type: 'array'
            }
          },
          type: 'object'
        })
        this.set('bunsenView', {
          cellDefinitions: {
            main: {
              children: [
                {
                  children: [
                    {
                      model: 'multiselect',
                      renderer: {
                        name: 'multi-select'
                      }
                    }
                  ],
                  label: 'MultiSelect',
                  collapsible: true
                }
              ],
              label: 'Refine by'
            }
          },
          cells: [
            {
              extends: 'main'
            }
          ],
          type: 'form',
          version: '2.0'
        })
      })
      describe('and a several selections are made', function () {
        beforeEach(function () {
          render.call(this)
        })
        it('normalizes as expected', function () {
          $hook('my-form-multiselect').find('.frost-select').click()
          $hook('my-form-multiselect-item', {index: 0}).trigger('mousedown')
          $hook('my-form-multiselect-item', {index: 1}).trigger('mousedown')

          expect(
              props.onChange.lastCall.args[0].multiselect,
               'multi-select filter value is normalized'
          ).to.have.members(['multiselect1', 'multiselect2'])
        })
      })
    })
  })
})
