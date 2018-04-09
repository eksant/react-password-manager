import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { notification } from 'antd';
import { users } from '../../firebase';
import { CreateUser, ReadUserByUsername } from "../../store/users/users.actions";
import { 
  Container, 
  Row, 
  Col, 
  CardGroup, 
  Card, 
  CardBody, 
  Button, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText,
  Form,
  FormGroup
} from 'reactstrap';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      regUsername: '',
      regPassword: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    // console.log('handleChange event', event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRegister(event) {
    event.preventDefault()
    // console.log('this state', this.state)
    if (this.state.regUsername === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Username must be filled !!',
      });
    } else if (this.state.regPassword === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Password must be filled !!',
      });
    } else {      
      let data = {
        username: this.state.regUsername,
        password: this.state.regPassword
      }
      // console.log('data', data)
      this.props.CreateUser(data)
      event.target.reset()
      // this.props.history.push('/login')
      this.setState({
        regUsername: '',
        regPassword: ''
      })
      notification['success']({
        message: 'Notification Success',
        description: 'Success to insert new record',
      });
    }
  }

  handleLogin(event) {
    event.preventDefault()
    // console.log('this state', this.state)
    if (this.state.username === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Username must be filled !!',
      });
    } else if (this.state.password === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Password must be filled !!',
      });
    } else {
      // console.log('this state', this.state)
      users.get()
      .then(QuerySnapshot => {
        let result = null
        // console.log('ReadUserByUsername QuerySnapshot', QuerySnapshot)
        QuerySnapshot.forEach(currentItem => {
          let data = currentItem.data()
          // console.log('ReadUserByUsername data', data)
          if (data.username === this.state.username && data.password === this.state.password) {
            result = {
              ...data,
              id: currentItem.id
            }
          }
        })
        // console.log('result', result)
        if (result) {
          // this.props.ReadUserByUsername(this.state.username, this.state.password)
          localStorage.setItem('user', result.username)
          localStorage.setItem('userid', result.id)
          this.props.history.push('/dashboard')
        } else {
          notification['warning']({
            message: 'Notification Login',
            description: 'Invalid Username or Password !!',
          });
        }
      })      
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your passportal</p>
                    <Form onSubmit={this.handleLogin} className="form-horizontal">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="Username"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          {/* <Button color="link" className="px-0">Forgot password?</Button> */}
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-4" style={{ width: 44 + '%' }}>
                  <CardBody>
                    <h1>Sign Up</h1>
                    <p className="text-muted">Sign Up to join passportal</p>
                    <Form onSubmit={this.handleRegister} className="form-horizontal">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="regUsername" value={this.state.regUsername} onChange={this.handleChange} type="text" placeholder="Username"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="regPassword" value={this.state.regPassword} onChange={this.handleChange} type="password" placeholder="Password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="success" className="px-4">Register</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispacthToProps = (dispatch) => (
  bindActionCreators({
    CreateUser, 
    ReadUserByUsername
  }, dispatch)
);

export default connect(mapStateToProps, mapDispacthToProps)(Login);
