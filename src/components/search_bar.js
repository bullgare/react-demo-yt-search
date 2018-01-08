import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: props.term || ''};
  }

  render() {
    return (
      <div className='search-bar'>
        <input
          value={this.state.term}
          onChange={event => this.onChange(event)} />
      </div>
    );
  }

  onChange(event) {
    const term = event.target.value;
    this.setState({term});
    if (this.props.onTermChange) {
      this.props.onTermChange(term);
    }
  }
}

export default SearchBar;
