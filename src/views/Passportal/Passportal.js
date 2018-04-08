import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Modal, Button, notification } from 'antd';
import Loading from '../Loading/';
import { ReadPassportals, ReadPassportalById, DeletePassportal } from "../../store/passportals/passportals.actions";
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table
} from 'reactstrap';

const confirm = Modal.confirm;

function showConfirm(id, e) {
  confirm({
    title: 'Confirmation',
    content: 'Do you Want to delete these items ?',
    onOk() {
      // console.log('delete id', id);
      e.DeletePassportal(id)
      e.ReadPassportals()
      notification['success']({
        message: 'Notification Success',
        description: 'Success to insert delete record',
      });
    },
  });
}

class Passportal extends Component {
  constructor() {
    super()
    this.state = {
      showPassword: false
    }
  }

  componentDidMount() {
    this.props.ReadPassportals()
  }

  loadPassportalForm(id) {
    this.props.ReadPassportalById(id)
    this.props.history.push(`/passportal/edit/${id}`)
  }

  render() {
    if (this.props.passportals.loading) {
      return <Loading />
    } else {
      const passportals = this.props.passportals;
      // console.log('component passportals', passportals.datas)
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> List All Your Password
                  <div className="card-actions">
                    <Link to="/passportal/new" className="btn-primary"><i className="icon-doc"></i></Link>
                  </div>
                </CardHeader>
                <CardBody>
                  <Table hover bordered striped responsive size="sm">
                    <thead>
                    <tr>
                      <th>Site URL</th>
                      <th>Username</th>
                      <th>
                        <div className="row">
                          <div className="col-sm-9">Password</div>
                          <div className="col-sm-3" onClick={() => this.setState({ showPassword: !this.state.showPassword })} style={{cursor: "pointer"}}>
                            { this.state.showPassword ? (
                              <i className="fa fa-eye-slash"></i>
                            ) : (
                              <i className="fa fa-eye"></i>
                            ) }                            
                          </div>
                        </div>
                      </th>
                      <th>Create At</th>
                      <th>Updated At</th>
                      <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        passportals.datas.map((passportal, i) => (
                          <tr key={i}>
                            <td><a href={passportal.URL} target="_blank">{passportal.URL}</a></td>
                            <td>{passportal.username}</td>
                            { this.state.showPassword ? (<td>{passportal.password}</td>) : (<td>{passportal.password.replace(/./g, "≎")}</td>) }
                            <td>{passportal.createdAt}</td>
                            <td>{passportal.updatedAt}</td>
                            <td>
                              <Button onClick={() => this.loadPassportalForm(passportal.id)} className="btn btn-outline-primary btn-sm"><i className="icon-note"></i></Button>
                              <Button onClick={() => showConfirm(passportal.id, this.props)} className="btn btn-outline-danger btn-sm"><i className="icon-trash"></i></Button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )
    }
  }
};

const mapStateToProps = (state) => ({
  passportals: state.passportals,
});

const mapDispacthToProps = (dispatch) => (
  bindActionCreators({
    ReadPassportals,
    ReadPassportalById,
    DeletePassportal
  }, dispatch)
);

export default connect(mapStateToProps, mapDispacthToProps)(Passportal);
