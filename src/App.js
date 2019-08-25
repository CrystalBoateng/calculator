import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        expression: '',
        solution: '0',
        shadowPosition: 'outer-shadow-1'
      };
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }
  // Behaviors
  backspace() {
    this.setState({expression: this.state.expression.slice(0,-1)});
  }
  clear() {
    this.setState({expression: '', solution: '0'});
  }
  evaluateExpression() {
    // clears any buttons in focus
    document.activeElement.blur()
    // formats exponents correctly
    this.setState({
      expression: String(this.state.expression)
        .replace('^','**')
        .replace('e','**')
    });
    // tries to evaluate the expression as a JavaScript expression
    try {
      this.setState(
          {solution: parseFloat(eval(this.state.expression))}
        );
    }
    catch(err) {
      this.setState({solution: 'Error'});
    }
  }
  moveBackground(e) {
    let ratio = e.clientX / document.body.clientWidth;
    if (ratio > 0.75) {
      this.setState({shadowPosition: 'outer-shadow-4'});
    } else if (ratio > 0.5) {
      this.setState({shadowPosition: 'outer-shadow-3'});
    } else if (ratio > 0.25) {
      this.setState({shadowPosition: 'outer-shadow-2'});
    } else {
      this.setState({shadowPosition: 'outer-shadow-1'});
    }
  }
  // Event handling
  contains(key, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (key === arr[i]) {
        return true;
      }
    }
  }
  handleKeydown(evt) {
    switch (true) {
      // Performs actions
      case this.contains(evt.key, ['Backspace', 'Delete']): {
        this.backspace();
        break;
      }
      case this.contains(evt.key, ['c', 'Escape', 'Clear']): {
        this.clear();
        break;
      }
      case this.contains(evt.key, ['Enter', '=']): {
        this.evaluateExpression();
        break;
      }
      // Mathematical operators
      case this.contains(evt.key, ['+','-','*','/','e','.']): {
        this.setState({expression: this.state.expression + evt.key});
        break;
      }
      case this.contains(evt.key, ['%']): {
        this.setState({expression: this.state.expression + '/'});
        break;
      }
      // Numbers and parentheses
      case evt.code.slice(0, 6) === 'Numpad': {
        this.setState({
          expression: this.state.expression + evt.key
        });
        break;
      }
      case evt.code.slice(0, 5) === 'Digit': {
        this.setState({
          expression: this.state.expression + evt.key
        });
        break;
      }
      default: {
        break;
      }
    }
  }
  handleClick(evt) {
    switch (true) {
      // Performs actions
      case this.contains(evt.target.textContent, ['<-']): {
        this.backspace();
        break;
      }
      case this.contains(evt.target.textContent, ['C']): {
        this.clear();
        break;
      }
      case this.contains(evt.target.textContent, ['=']): {
        this.evaluateExpression();
        break;
      }
      // Numbers and Mathematical operators
      case this.contains(evt.target.textContent, ['x']): {
        this.setState({expression: this.state.expression + '*'});
        break;
      }
      default: {
        this.setState({
          expression: this.state.expression + evt.target.textContent
          });
        break;
      }
    }
  }
  handleMouseMove(evt) {
    this.moveBackground(evt);
  }
  // Mounting and Rendering
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeydown, false);
    document.addEventListener("mousemove", this.handleMouseMove, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeydown, false);
    document.removeEventListener("mousemove", this.handleMouseMove, false);
  }
  render() {
    let display = 
      <div id="display">
        <span id="expression">{this.state.expression}</span>
        <span id="solution">{this.state.solution}</span>
      </div>;
    let keypad = 
      <div id="keypad">
        <button onClick={this.handleClick} title='Backspace' 
                className='tan'>&lt;-</button>
        <button onClick={this.handleClick} title='Opening parenthesis' 
                className='tan'>(</button>
        <button onClick={this.handleClick} title='Closing parenthesis' 
                className='tan'>)</button>
        <button onClick={this.handleClick} title='Add' 
                className='tan'>+</button>
        <button onClick={this.handleClick} title='7'>7</button>
        <button onClick={this.handleClick} title='8'>8</button>
        <button onClick={this.handleClick} title='9'>9</button>
        <button onClick={this.handleClick} title='Subtract' 
                className='tan'>-</button>
        <button onClick={this.handleClick} title='5'>5</button>
        <button onClick={this.handleClick} title='6'>6</button>
        <button onClick={this.handleClick} title='7'>7</button>
        <button onClick={this.handleClick} title='Multiply' 
                className='tan'>x</button>
        <button onClick={this.handleClick} title='1'>1</button>
        <button onClick={this.handleClick} title='2'>2</button>
        <button onClick={this.handleClick} title='3'>3</button>
        <button onClick={this.handleClick} title='Divide' 
                className='tan'>/</button>
        <button onClick={this.handleClick} title='0'>0</button>
        <button onClick={this.handleClick} title='Decimal'>.</button>
        <button onClick={this.handleClick} title='Clear' 
                className='tan'>C</button>
        <button onClick={this.handleClick} title='Equals' 
                className='tan'>=</button>
      </div>;
    return (
      <div className="App">
        <div id="outer-wrapper" className={this.state.shadowPosition}>
          <div id="inner-wrapper">
            {display}
            {keypad}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
