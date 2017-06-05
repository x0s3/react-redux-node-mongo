/**
 * Created by root on 26/05/17.
 */
import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'users',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Users = require('./containers/UsersContainer').default;
      const reducer = require('./modules/users').default;
      injectReducer(store, {key: 'users', reducer});
      cb(null, Users);
    }, 'users')
  }
})
