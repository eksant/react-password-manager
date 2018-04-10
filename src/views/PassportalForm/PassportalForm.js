import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import { CreatePassportal, ReadPassportalById, UpdatePassportal } from "../../store/passportals/passportals.actions";
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Collapse,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap';

class PassportalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      URL: '',
      username: '',
      password: '',
      createdAt: '',
      updatedAt: '',
      title: 'Add New',
      isEdit: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log('handleChange event', event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleSubmit(event) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&-])[A-Za-z\d$@$!%*#?&]{8,}$/;
    event.preventDefault()
    // console.log('this state', this.state)
    // console.log('regex.test', regex.test(data.password),data.password);
    if (this.state.URL === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Site URL must be filled !!',
      });
    } else if (this.state.username === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Username must be filled !!',
      });
    } else if (this.state.password === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Password must be filled !!',
      });
    } else if (!regex.test(this.state.password)) {
      notification['warning']({
        message: 'Notification Password',
        description: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters !!',
      });
    } else {      
      // console.log('this state data', this.state)
      if (!this.state.isEdit) {
        let data = {
          URL: this.state.URL,
          username: this.state.username,
          password: this.state.password,
          // createdAt: this.state.createdAt
        }

        this.props.CreatePassportal(data)
        event.target.reset()
        this.props.history.push('/passportal')
        notification['success']({
          message: 'Notification Success',
          description: 'Success to insert new record',
        });
      } else {
        let data = {
          URL: this.state.URL,
          username: this.state.username,
          password: this.state.password,
          createdAt: new Date(Date.now()).toLocaleString(),
          updatedAt: new Date(Date.now()).toLocaleString(),
          userId: localStorage.getItem('userid')
        }

        this.props.UpdatePassportal(this.state.id, data)
        // event.target.reset()
        this.props.history.push('/passportal')
        notification['success']({
          message: 'Notification Success',
          description: 'Success to edit record',
        });
      }
    }
  }

  handleEdit(data) {
    // console.log('handleEdit event', data)
    // console.log('handleEdit passportal', passportal)
    this.setState({
      id: data.id,
      URL: data.URL,
      username: data.username,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      title: 'Edit',
      isEdit: true
    })
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      // console.log('componentWillMount id', this.props.match.params.id)
      this.props.ReadPassportalById(this.props.match.params.id)
    }
  }

  componentWillReceiveProps() {
    if (this.props.passportals.data) {
      // console.log('componentWillReceiveProps', this.props.passportals)
      this.handleEdit(this.props.passportals.data)
    }
  }

  render() {
    const passportal = this.props.passportals.data;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <Card>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <CardHeader>
                  <strong>{this.state.title}</strong> Password Portal
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Col md="2"><Label htmlFor="URL">Site URL *</Label></Col>
                    <Col xs="12" md="10">
                      <Input type="text" name="URL" value={this.state.URL} onChange={this.handleChange} require="true" placeholder="Please enter your site url..."/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2"><Label htmlFor="username">Username *</Label></Col>
                    <Col xs="12" md="10">
                      <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} require="true" placeholder="Please enter your username..."/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2"><Label htmlFor="password">Password *</Label></Col>
                    <Col xs="12" md="10">
                      <Input type="password" name="password" value={this.state.password}  onChange={this.handleChange} require="true" placeholder="Please enter your password..."/>
                      <FormText className="help-block">
                        We recomended for password security:
                        <ul>
                          <li>Password must have at least one uppercase character (A ... Z)</li>
                          <li>Password must have at least one lowercase character (a ... z)</li>
                          <li>Password must have at least one special character (#$@!% ...)</li>
                          <li>Password must have at least one number (0 ... 9)</li>
                          <li>Password must be longer than 8 characters (> 8)</li>
                        </ul>
                      </FormText>
                    </Col>
                  </FormGroup>                  
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="md" color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>
                  <Link to="/passportal"><Button type="reset" size="md" color="danger"><i className="fa fa-ban"></i> Cancel</Button></Link>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  passportals: state.passportals,
});

const mapDispacthToProps = (dispatch) => (
  bindActionCreators({
    CreatePassportal,
    ReadPassportalById,
    UpdatePassportal
  }, dispatch)
);

export default connect(mapStateToProps, mapDispacthToProps)(PassportalForm);
