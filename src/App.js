import React from "react";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import Button from "./components/Button";
import Table from "./components/Table";
import UserData from "./components/UserData";
import SearchBar from "./components/SearchBar";
// import data from "./dataFromServer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: data,
      data: null,
      isLoading: false,
      error: null,
      sortBy: null,
      sortReverse: false,
      selectedUser: null,
      searchString: "",
      perPage: 50,
      // pageCount: null,
      selectedPage: 0,
      addedData: [],
    };
  }

  render() {
    const searchString = this.state.searchString.trim();
    let dataFiltered = [];
    let dataPart = [];
    let pageCount;
    if (this.state.data) {
      if (searchString !== "") {
        dataFiltered = this.filter(searchString);
      } else {
        dataFiltered = [...this.state.data];
      }
      // или добавлять сразу в state.data, но тогда оно расположится согласно соритировки, а не в начало таблицы
      // добавятся в начало таблицы не смотря на сортировку и фильтрацию
      dataFiltered = [...this.state.addedData, ...dataFiltered];
      pageCount = Math.ceil(dataFiltered.length / this.state.perPage);
      const from = this.state.selectedPage * this.state.perPage;
      const to = (this.state.selectedPage + 1) * this.state.perPage;
      dataPart = dataFiltered.slice(from, to);
      //добавятся в начало каждой страниц (увеличив кол-во показываемых строк)
      // dataPart = [...this.state.addedData, ...dataPart];
    }

    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loader
            type="Oval"
            color="#343a40"
            height={75}
            width={75}
            className={"loader-fixed"}
          />
        ) : null}
        {!this.state.data ? (
          <>
            <div className="row mt-5 mb-4">
              <div className="col-auto">
                <Button
                  value={"Маленький пак"}
                  link={this.shortRequest}
                  clickHandler={this.loadButtonHandler}
                />
              </div>
              <div className="col-auto">
                <Button
                  value={"Большой пак"}
                  link={this.longRequest}
                  clickHandler={this.loadButtonHandler}
                />
              </div>
            </div>
            {this.state.error ? (
              <div className="row">
                <div className="col">
                  <p className={"text-danger"}>{this.state.error}</p>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
        {this.state.data ? (
          <div className="row my-4">
            <div className="col">
              <SearchBar handleSearchClick={this.handleSearchClick} />
              <Table
                data={dataPart}
                // data={this.state.data}
                sortBy={this.state.sortBy}
                sortReverse={this.state.sortReverse}
                handleSortClick={this.handleSortClick}
                handleRowClick={this.handleRowClick}
                handleAddToTable={this.handleAddToTable}
              />
              {pageCount > 1 ? (
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  // pageCount={this.state.pageCount}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  forcePage={this.state.selectedPage}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  pageClassName="page-item"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  pageLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  breakLinkClassName="page-link"
                />
              ) : null}
            </div>
          </div>
        ) : null}
        {this.state.selectedUser !== null ? (
          <div className="row mb-4">
            <div className="col">
              <UserData user={dataPart[this.state.selectedUser]} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  shortRequest =
    "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
  longRequest =
    "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

  loadData(url) {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            data: result,
            isLoading: false,
            // pageCount: Math.ceil(result.length / this.state.perPage),
          });
        },
        (error) => {
          this.setState({
            isLoading: false,
            error: error.message,
          });
        }
      );
  }

  loadButtonHandler = (url) => {
    this.setState({
      isLoading: true,
      selectedUser: null,
      selectedPage: 0,
      sortBy: null,
      sortReverse: false,
      searchString: "",
      error: null,
    });
    this.loadData(url);
  };

  handleSortClick = (type) => {
    this.sort(type);
  };

  sort = (type) => {
    let sortReverse = this.state.sortReverse;
    if (this.state.sortBy === type) {
      sortReverse = !sortReverse;
    }
    const direction = sortReverse ? -1 : 1;

    const sorted = [].slice.call(this.state.data).sort((a, b) => {
      if (a[type] === b[type]) {
        return 0;
      }
      return a[type] > b[type] ? direction : direction * -1;
    });

    this.setState({
      data: sorted,
      sortBy: type,
      sortReverse: sortReverse,
      selectedUser: null,
    });
  };

  handleRowClick = (index) => {
    if (this.state.selectedUser !== index) {
      this.setState({
        selectedUser: index,
      });
    }
  };

  filter = (substring) => {
    const str = substring.trim().toLowerCase();
    return this.state.data.filter((user) => {
      return (
        user.id.toString().toLowerCase().includes(str) ||
        user.firstName.toLowerCase().includes(str) ||
        user.lastName.toLowerCase().includes(str) ||
        user.email.toLowerCase().includes(str) ||
        user.phone.toLowerCase().includes(str)
      );
    });
  };

  handleSearchClick = (value) => {
    this.setState({
      searchString: value,
      selectedUser: null,
      selectedPage: 0,
    });
  };

  handlePageClick = (pageNumber) => {
    this.setState({
      selectedPage: pageNumber.selected,
      selectedUser: null,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  handleAddToTable = (object) => {
    this.setState((prevState) => ({
      addedData: [object, ...prevState.addedData],
    }));
  };
}

export default App;
