import Ember from 'ember'
import dummyData from '../mocks/dummyInput'
import MyMixin from './temp-mixin'

export default Ember.Route.extend(MyMixin, {

  model: function () {
    return this.get('store').findAll('resource')
      .then((resources) => {
        return {
          model: dummyData.model,
          resources
        }
      })
  },

  setupController: function(controller, model) {
    debugger;
    this._super(controller, model);
    //
    let activeFacets = controller.get('activeFacets');

    activeFacets.forEach((facet) => {
      if (facet.id === 'id') {
        controller.set('objectBrowserConfig.facetsConfig.value.id', facet.value);
      }
      if (facet.id === 'alias') {
        controller.set('objectBrowserConfig.facetsConfig.value.alias', facet.value);
      }
    })
  }
})