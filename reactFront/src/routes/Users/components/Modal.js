/**
 * Created by root on 4/06/17.
 */
import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ModalExcel extends Component {
  state = { modalOpen: true };

  handleClose = (e) => this.setState({
    modalOpen: false,
  });

  render() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='file excel outline' content='Sever message' />
        <Modal.Content>
          <h3>El excel se ha generado correctamente.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> Continuar
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
