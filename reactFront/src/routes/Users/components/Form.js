/**
 * Created by root on 4/06/17.
 */
import React from 'react';
import {Button, Form, Radio} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class Formu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      value: undefined,
      nombre: undefined,
      edad: undefined,
      altura: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
  }

  handleSubmit(event) {
    this.setState({loading: true});
    let req = {
      nombre: document.querySelector("input[name='nombre']").value,
      altura: document.querySelector("input[name='altura']").value,
      edad: document.querySelector("input[name='edad']").value,
      sexo: this.state.value == 1 ? "true" : "false"
    };
    if (this.props.up !== undefined) {
      req._id = this.props.editar._id;
      req.__v = 0;
      this.props.up(req);
    }
    else
      this.props.cre(req);
    setTimeout(() => {
      this.setState({loading: false})
    }, 1200);
    document.querySelector("input[name='nombre']").value = "";
    document.querySelector("input[name='edad']").value = "";
    document.querySelector("input[name='altura']").value = "";
    this.setState({
      value: undefined,
      nombre: "",
      edad: "",
      altura: ""
    });
    event.preventDefault();
  }

  componentDidMount() {
    if(this.props.editar !== undefined){
      this.setState({
        nombre: this.props.editar.nombre,
        edad: this.props.editar.edad,
        altura: this.props.editar.altura
      });
    }
  }

  handleChange = (e, {value}) => this.setState({value});

  handleChange2(event) {
    this.setState({
      nombre:event.target.value
    });
  };

  handleChange3(event) {
    this.setState({
      edad:event.target.value
    })
  };

  handleChange4(event) {
    this.setState({
      altura:event.target.value
    })
  };

  render() {
    const {value} = this.state;
    return (
      <Form loading={this.state.loading} method="POST" onSubmit={this.handleSubmit}>
        <Form.Field required>
          <label>Nombre: </label>
          <input name="nombre" placeholder='Nombre de la persona'
                 onChange={this.handleChange2} value={this.state.nombre}/>
        </Form.Field>
        <Form.Field required>
          <label>Edad: </label>
          <input name="edad" placeholder='Edad de la persona'
                 onChange={this.handleChange3} value={this.state.edad}/>
        </Form.Field>
        <Form.Field required>
          <label>Altura: </label>
          <input name="altura" placeholder='Altura de la persona'
                 onChange={this.handleChange4} value={this.state.altura}/>
        </Form.Field>
        <Form.Field required control={Radio} label='Hombre' value='1' checked={value === "1"}
                    onChange={this.handleChange}/>
        <Form.Field required control={Radio} label='Mujer' value='2' checked={value === "2"}
                    onChange={this.handleChange}/>
        <Button type='submit'>{this.props.editar !== undefined ? "Actualizar" : "Registrar"}</Button>
      </Form>
    )
  }
}

Formu.propTypes = {
  cre: PropTypes.func,
  editar: PropTypes.object,
  up: PropTypes.func
};
