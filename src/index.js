import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


class App extends React.Component {
  state = {lat: null, errorMessage: '' };

  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({lat: position.coords.latitude }),
      (err) => this.setState({errorMessage: err.message })
    );
  }

  renderContent(){
      if (this.state.errorMessage && !this.state.late){
          return <div>Error:{this.state.errorMessage}</div>;
    }

      if(!this.state.errorMessage && this.state.lat){    // render method just returns some JSX
        return <SeasonDisplay lat ={this.state.lat} />
    }

      return <Spinner message ='Please Accept Location Request.'/>
    }


  render(){ // render method required for every react component, it is called everytime state is updated
      return (
      <div className='border red'>
          {this.renderContent()}
      </div>
    );
  }
}
ReactDOM.render(<App />,document.querySelector('#root'));










/*
-------------------------------------------------
RULES OF CLASS COMPONENTS
1. Must be a javascript class.
2. Must extend (subclass) React.COMPONENT.
3. Must define a 'render' method that returns JSX.

RULES OF STATE
 1. Only usable with class components.
 2. Confusion of props and state are common.
 3. 'state' is a JS object that contains data relevant to a component.
 4. Updating 'state' on a component causes the component to (almost) instantly render.
 5. State must be initialized when a component is created.
 6. State can ONLY be updated using the function 'setState'.


 SEQUENCE OF EXECUTION
 1. JS file is loaded by browser
 2. Instance of App component is created
 3. App components 'constructor' function gets called
 4. State object is created and assigned to the this.state property
 5. We call geolocation service
 6. React calls the component render method
 7. App returns JSX, gets rendered to the page as HTML
 8. We finally get result of geolocation request
 9. We update our state object with a call to this.setState
 10. React see that we updated the state of a component
 11. Because of update, React calls our 'render' method a second time
 12. Render methods returns some updated JSX
  */
