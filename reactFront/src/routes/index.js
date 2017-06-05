import CoreLayout from '../layouts/PageLayout/PageLayout';
import Home from './Home';
import Users from './Users';

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    Users(store)
  ]
});

export default createRoutes;
