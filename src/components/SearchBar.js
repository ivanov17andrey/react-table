import React from "react";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputString: ""
		}
	}
	
  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control form-control-dark"
          placeholder="Поиск"
					value={this.state.inputString}
					onChange={this.onInput}
        />
        <div className="input-group-append">
          <button
            className="btn btn-dark"
            type="button"
						onClick={this.props.handleSearchClick.bind(null, this.state.inputString)}
          >
            Найти
          </button>
        </div>
      </div>
    );
	}
	
	onInput = (event) => {
		this.setState({
			inputString: event.target.value
		})
	}
}

export default SearchBar;
