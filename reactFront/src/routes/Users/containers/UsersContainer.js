/**
 * Created by root on 26/05/17.
 */
import {connect} from 'react-redux';
import {showUsers, getUsers, createExcel, deleteUser,createUser,updateUser} from '../modules/users';
import Users from '../components/Users';


const mapDispatchToProps = {
  showUsers,
  getUsers,
  createExcel,
  deleteUser: (id) => deleteUser(id),
  createUser: (req) => createUser(req),
  updateUser: (req) => updateUser(req)
};

const mapStateToProps = (state) => ({
  usuarios: {usuarios: state.users}
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
