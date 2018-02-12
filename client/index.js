import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

class Component extends React.Component{
  render(){
    return (
      <Main />
      )
  };
};

ReactDOM.render(<Component />,
    document.getElementById('content'));
