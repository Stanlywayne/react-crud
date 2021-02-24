import React, { Component } from 'react';
import './style.css';

class CRUD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyname: "",
      vechicle: "",
      price: "",
      items: [],
      submited: false,
      showAddorEdit: false,
      showTable: true
    };
  }

  changehandling = (event, name) => {
    this.setState({ [name]: event.target.value })
  }
  showInput = () => {
    this.setState({ showAddorEdit: true, showTable: false })
  }

  addNew = () => {
    this.setState({ submited: true })
    if (this.state.companyname && this.state.vechicle && this.state.price) {
      if (this.state.isEdit) {
        let list = this.state.items;
        list[this.state.selectedindex] = ({ companyname: this.state.companyname, vechicle: this.state.vechicle, price: this.state.price })
        this.setState({ items: list, showAddorEdit: false, showTable: true })
        this.reset()
      }
      else {
        let items = this.state.items;
        items.push({ companyname: this.state.companyname, vechicle: this.state.vechicle, price: this.state.price })
        this.setState({ items: items, showAddorEdit: false, showTable: true })
        localStorage.setItem("item", JSON.stringify(items))
        this.reset()
      }
    }
  }
  componentDidMount() {
    let dam = localStorage.getItem("item");
    if (dam) {
      this.setState({ items: JSON.parse(dam) })
    }
  }

  editfor = (item, index) => {
    this.setState({ showAddorEdit: true, companyname: item.companyname, vechicle: item.vechicle, price: item.price, isEdit: true, selectedindex: index })
  }

  delete = (index) => {
    if (window.confirm("are you sure want to Delete this item")) {
      let items = this.state.items;
      items.splice(index, 1)
      this.setState({ items: items })
      localStorage.setItem("item", JSON.stringify(items))
    }
  }

  reset = () => {
    this.setState({ companyname: "", vechicle: "", price: "", isEdit: false, submited: false })
  }

  render() {
    const bindVehicles = this.state.items && this.state.items.map(function (ent, index) {
      return (
        <tr key={index + 1}>
          <td>{ent.companyname}</td>
          <td>{ent.vechicle}</td>
          <td>{ent.price}</td>
          <td><button type="button" className="btn btn-light" onClick={() => this.editfor(ent, index)}>Edit</button><span> </span>
            <button type="button" className="btn btn-light" onClick={() => this.delete(index)}>Delete</button></td>
        </tr>)
    }, this
    )

    return (
      <div>
        <div className="header">
          <h2><i><b>React CRUD Operation</b></i></h2>
        </div><br /><br />
        <div className="container">
          <h2 className="app">Vechicle Details</h2>
        </div><br /><br />
        { this.state.showTable &&
          <div className="container">
            <div className="float">
              <button type="button" className="btn btn-danger" onClick={this.showInput} >ADD</button>
            </div><br></br><br></br>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Vechicle Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  bindVehicles
                }
                {this.state.items.length === 0 &&
                  <tr><td colSpan="4" className="textCenter">No Vechicles Found</td></tr>}
              </tbody>
            </table><br /><br />
          </div>}
        {
          this.state.showAddorEdit &&

          <div className="container addVehicle">
            <div className="row">
              <label htmlFor="companyname" className="col-sm-4"><b>Company Name</b></label>
              <div className="col-sm-8">
                <input type="text" id="companyname" name="companyname" value={this.state.companyname} onChange={(event, name) => this.changehandling(event, "companyname")} />
                {this.state.submited && !this.state.companyname && <span className="label">Enter Name</span>}
              </div>
            </div><br></br>
            <div className="row">
              <label htmlFor="vechicle" className="col-sm-4"><b>Vechicle Name</b></label>
              <div className="col-sm-8">
                <input type="text" id="vechicle" name="vechicle" value={this.state.vechicle} onChange={(event, name) => this.changehandling(event, "vechicle")} /><span>  </span>
                {this.state.submited && !this.state.vechicle && <span className="label">Vechicle Name</span>}</div>
            </div><br></br>
            <div className="row">
              <label htmlFor="price" className="col-sm-4"><b>Price</b></label>
              <div className="col-sm-8">
                <input type="number" id="price" name="price" value={this.state.price} onChange={(event, name) => this.changehandling(event, "price")} />
                {this.state.submited && !this.state.price && <span className="label"><span>  </span>Enter Price</span>}</div>
            </div>
            <div className="container buttoncenter">
              <button type="button" className="btn btn-danger" onClick={this.addNew}>Save</button><span>  </span>
              <button type="button" className="btn btn-danger" onClick={this.reset}>Reset</button>
            </div>
          </div>
        }

      </div>
    );
  }
}

export default CRUD;
