import React, { Component } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showContent: false, getSearchValue: ''  };
  }

  onValueChange = (e) => {
    const value = e.target.value;
    if(value.length >= 5) {
      this.setState({ showContent: true, getSearchValue: value });
    }
  };

  render() {
    const { showContent, getSearchValue } = this.state;
    return (
      <div className="App">
        <Header onValueChange={this.onValueChange} />
        {showContent ? (<div className="container mt-3">
          <Content searchValue={ getSearchValue } />
        </div>) : null}
      </div>
    );
  }
}

export default App;
