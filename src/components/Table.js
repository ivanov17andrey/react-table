import React from "react";
import Button from "./Button";
import AddForm from "./AddForm";
import classNames from "classnames";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addedUsers: null,
      addFormIsOpened: false,
    };
  }

  render() {
    return (
      <>
        <div className="col mb-3 p-0">
				<Button value={"Добавить"} clickHandler={this.handleShowForm}/>
				</div>
        {this.state.addFormIsOpened ? (
          <AddForm handleAddToTable={this.props.handleAddToTable} handleHideForm={this.handleHideForm} />
        ) : null}
        <table className={"table table-striped table-hover"}>
          <thead className={"thead-dark"}>
            <tr>
              <th
                className={classNames({
                  sortable: this.props.sortBy === "id",
                  "sortable-reverse":
                    this.props.sortBy === "id" && this.props.sortReverse,
                })}
                onClick={this.props.handleSortClick.bind(null, "id")}
              >
                id <span className={"arrow"}>&#9662;</span>
              </th>
              <th
                className={classNames({
                  sortable: this.props.sortBy === "firstName",
                  "sortable-reverse":
                    this.props.sortBy === "firstName" && this.props.sortReverse,
                })}
                onClick={this.props.handleSortClick.bind(null, "firstName")}
              >
                firstName <span className={"arrow"}>&#9662;</span>
              </th>
              <th
                className={classNames({
                  sortable: this.props.sortBy === "lastName",
                  "sortable-reverse":
                    this.props.sortBy === "lastName" && this.props.sortReverse,
                })}
                onClick={this.props.handleSortClick.bind(null, "lastName")}
              >
                lastName <span className={"arrow"}>&#9662;</span>
              </th>
              <th
                className={classNames({
                  sortable: this.props.sortBy === "email",
                  "sortable-reverse":
                    this.props.sortBy === "email" && this.props.sortReverse,
                })}
                onClick={this.props.handleSortClick.bind(null, "email")}
              >
                email <span className={"arrow"}>&#9662;</span>
              </th>
              <th
                className={classNames({
                  sortable: this.props.sortBy === "phone",
                  "sortable-reverse":
                    this.props.sortBy === "phone" && this.props.sortReverse,
                })}
                onClick={this.props.handleSortClick.bind(null, "phone")}
              >
                phone <span className={"arrow"}>&#9662;</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.addedUsers
              ? this.state.addedUsers.map((user) => {
                  return (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                    </tr>
                  );
                })
              : null}
            {this.props.data.map((user, index) => {
              return (
                <tr
                  key={index}
                  onClick={this.props.handleRowClick.bind(null, index)}
                >
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }

  handleShowForm = () => {
    this.setState({
      addFormIsOpened: true,
    });
  };

  handleHideForm = () => {
    this.setState({
      addFormIsOpened: false,
    });
  };
}

export default Table;
