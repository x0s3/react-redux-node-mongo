/**
 * Created by root on 4/06/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'semantic-ui-react';
import Formu from './Form';

export default class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      form:false,
      actual:{}
    };
    this.actualizar = this.actualizar.bind(this);
  }

  actualizar(actual) {
    this.setState({
      actual:actual
    });
    this.setState({
      form:true
    });
  }


  render() {
    const muestraTodos = <Card.Group>
      {
        this.props.user.usuarios.usuarios.map((actual, i) => {
          return (
            <Card key={i}>
              <Card.Content>
                <Card.Header>
                  {actual.nombre}
                </Card.Header>
                <Card.Description>
                  <strong>Edad:</strong> {actual.edad}<br/><strong>Altura:</strong> {actual.altura}<br/><strong>Sexo:</strong> {actual.sexo ? "Hombre" : "Mujer"}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button className="ui basic button green" onClick={() => this.actualizar(actual)}>Editar</Button>
                  <Button basic color='red' onClick={() => this.props.del(actual._id)}>Eliminar</Button>
                </div>
              </Card.Content>
            </Card>
          )
        })
      }
    </Card.Group>;
    return (
      <div>
        {
         !this.state.form ? muestraTodos : <Formu editar={this.state.actual} up={this.props.up}/>
        }
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  del: PropTypes.func.isRequired,
  up: PropTypes.func.isRequired
};
