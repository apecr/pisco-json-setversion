'use strict';

module.exports = {

  _getAction() {
    if (!this.params.action && this._flow) {
      this.params.action = this._flow.name;
    }
    const action = this.params.versionStrategies ? this.params.versionStrategies[this.params.action] : undefined;
    if (action) {
      action.actionName = this.params.action;
    }
    return action;
  },

  _doAction(action) {
    const branchName = this.scmGetBranch().split('/')[0];
    return this.semverConfig(action[branchName], this.params.pretag)
      .then((config) => {
        if (config && config.strategyName) {
          const strategyFunc = config.strategyName.indexOf('#') >= 0 ? this[config.strategyName.replace('#', '')] : this.semverStrategy;
          if (strategyFunc) {
            this.logger.info('Applying', '#cyan', action.actionName, 'action on', '#cyan', branchName, 'branch using', '#green', config.strategyName, 'strategy...');
            return strategyFunc(config);
          } else {
            this.logger.error('Function:', '#red', config.strategyName, 'not implemented!!');
            return Promise.reject();
          }
        }
      });
  },

  // ---- CUSTOM STRATEGIES ----

  preconsolidate(config) {
    return this.semverConsolidate(config)
      .then((_config) => {
        if (_config.hasChanged) {
          _config.strategyName = 'prepatch';
          return this.semverStrategy(_config);
        } else {
          return Promise.resolve(_config);
        }
      });
  },

  // ---- STAGES ----

  run(ok, ko) {
    const action = this._getAction();
    if (action) {
      return this._doAction(action)
        .then((config) => this.semverSaveVersion(config))
        .then(ok, ko);
    } else {
      ko({error: `Action "${this.params.action}" has no versioning strategy configured!!`});
    }
  }

};