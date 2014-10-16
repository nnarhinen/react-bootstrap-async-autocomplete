/**
 * @jsx React.DOM
 */

var AutocompleteFactory = function(
    React,
    Input,
    Popover,
    OverlayTrigger,
    ListGroup,
    ListGroupItem) {
  return React.createClass({
    getInitialState: function() {
      return {
        searchResults: []
      }
    },
    showResults: function() {
      this.refs.resultPopover.show();
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
      this.props.onItemSelect && this.props.onItemSelect(this.state.searchResults[i]);
      this.refs.resultPopover.hide();
    },
    renderResults: function() {
      var self = this;
      return (
          <Popover>
            {this.state.loading ? <p>Loading..</p> : (
            <ListGroup>
            { this.state.searchResults.map(function(one, i) {
                return <ListGroupItem key={i} href="#" onClick={self.searchResultClicked}>{self.props.itemContent ? self.props.itemContent(one) : one}</ListGroupItem>;
            }) }
            </ListGroup> ) }
          </Popover>
          );
    },
    render: function() {
      return (
          <OverlayTrigger placement="bottom" ref="resultPopover" trigger="manual" overlay={this.renderResults()}>
            { this.transferPropsTo(<Input onChange={this.handleTyping} type="text"/>) }
          </OverlayTrigger>
          );
    }
  });
};

if (typeof module === 'object' && module.exports) {
  module.exports = AutocompleteFactory(
      require('react'),
      require('react-bootstrap/Input'),
      require('react-bootstrap/Popover'),
      require('react-bootstrap/OverlayTrigger'),
      require('react-bootstrap/ListGroup'),
      require('react-bootstrap/ListGroupItem'));
} else if (typeof define === 'function' && define.amd) {
  define(function(require) {
    return AutocompleteFactory(
        require('react'),
        require('react-bootstrap/Input'),
        require('react-bootstrap/Popover'),
        require('react-bootstrap/OverlayTrigger'),
        require('react-bootstrap/ListGroup'),
        require('react-bootstrap/ListGroupItem'));
  });
} else {
  window.ReactBootstrapAsyncAutocomplete = AutocompleteFactory(
      window.React,
      window.ReactBootstrap.Input,
      window.ReactBootstrap.Popover,
      window.ReactBootstrap.OverlayTrigger,
      window.ReactBootstrap.ListGroup,
      window.ReactBootstrap.ListGroupItem);
}


