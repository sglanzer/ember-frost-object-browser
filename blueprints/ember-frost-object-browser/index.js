module.exports = {
  description: '',
  normalizeEntityName: function () {},

  /**
    Installs specified packages at the root level of the application.
    Triggered by 'ember install <addon name>'.

    @returns {Promise} package names and versions
  */
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-frost-core', target: '^1.0.0'},
        {name: 'ember-frost-list', target: '^5.2.1'},
        {name: 'ember-hook', target: '^1.3.1'},
        {name: 'ember-prop-types', target: '^3.0.0'}
      ]
    })
  }
}
