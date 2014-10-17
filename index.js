/**
 * @jsx React.DOM
 */

var AutocompleteFactory = function(
    React,
    Input,
    DropdownMenu,
    DropdownStateMixin,
    MenuItem) {
  return React.createClass({
    mixins: [DropdownStateMixin],
    getInitialState: function() {
      return {
        searchResults: []
      }
    },
    showResults: function() {
      this.setState({
        showResults: true
      });
    },
    handleTyping: function(ev) {
      var key = ev.target.value, self = this;
      if (this.props.onSearch) {
        this.setState({loading: true});
        this.props.onSearch(key, function(results) {
          self.setState({
            searchResults: results,
            loading: false
          });
        });
        this.showResults();
      }
    },
    searchResultClicked: function(i) {
      var self = this;
      return function(ev) {
        ev.preventDefault();
        self.props.onItemSelect && self.props.onItemSelect(self.state.searchResults[i]);
        self.setState({
          showResults: false
        });
      };
    },
    renderResults: function() {
      var self = this;
      if (this.state.loading) return <p>Loading results..</p>;
      return this.state.searchResults.map(function(one, i) {
        return <MenuItem key={i} onClick={self.searchResultClicked(i)}>{self.props.itemContent ? self.props.itemContent(one) : one}</MenuItem>;
      });
    },
    render: function() {
      var cls = 'dropdown';
      if (this.state.showResults) cls += ' open';
      return (
        <div className={cls}>
          { this.transferPropsTo(<Input className="dropdown-toggle"
                                        onChange={this.handleTyping}
                                        key={0}
                                        type="text" />) }
          <DropdownMenu ref="menu" key={1}>{this.renderResults()}</DropdownMenu>
        </div>
          );
    }
  });
};

if (typeof module === 'object' && module.exports) {
  module.exports = AutocompleteFactory(
      require('react'),
      require('react-bootstrap/Input'),
      require('react-bootstrap/DropdownMenu'),
      require('react-bootstrap/DropdownStateMixin'),
      require('react-bootstrap/MenuItem'));
} else if (typeof define === 'function' && define.amd) {
  define(function(require) {
    return AutocompleteFactory(
        require('react'),
        require('react-bootstrap/Input'),
        require('react-bootstrap/DropdownMenu'),
        require('react-bootstrap/DropdownStateMixin'),
        require('react-bootstrap/MenuItem'));
  });
} else {
  window.ReactBootstrapAsyncAutocomplete = AutocompleteFactory(
      window.React,
      window.ReactBootstrap.Input,
      window.ReactBootstrap.DropdownMenu,
      window.ReactBootstrap.DropdownStateMixin,
      window.ReactBootstrap.MenuItem);
}


