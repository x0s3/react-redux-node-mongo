/**
 * Created by root on 26/05/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import Formu from './Form';
import {Button, Menu} from 'semantic-ui-react';
import ModalExcel from './Modal';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      disabled: false,
      activeItem: 'users'
    };
    this.handleExcel = this.handleExcel.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.usuarios.usuarios.mess === 200)
      this.setState({modal: true});
    delete nextProps.usuarios.usuarios.mess;
  }

  handleExcel() {
    this.setState({
      loading: true,
      disabled: true
    });
    this.props.createExcel();
    setTimeout(() => {
      this.setState({loading: false})
    }, 1500)
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name});

  render() {
    const {activeItem} = this.state;
    return (
      <div style={{margin: '0 auto'}}>
        <Menu fluid widths={2}>
          <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick}/>
          <Menu.Item name='form' active={activeItem === 'form'} onClick={this.handleItemClick}/>
        </Menu>
        {
          activeItem === "users" ? <User user={this.props.usuarios} del={this.props.deleteUser} up={this.props.updateUser}/> :
            <Formu cre={this.props.createUser}/>
        }
        <br/>
        {
          this.state.modal ? <ModalExcel/> : ""
        }
        <Button loading={this.state.loading} disabled={this.state.disabled} color='green' onClick={this.handleExcel}>
          <i className="file excel outline icon"/> Exportar excel con los usuarios al servidor
        </Button>
      </div>
    );
  }
}

Users.propTypes = {
  usuarios: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  createExcel: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};
