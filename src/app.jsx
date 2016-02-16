import expect from 'expect';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

const counter = (state=0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect(
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect(
  counter(2, { type: 'UNKNOWN' })
).toEqual(2);

console.log("All tests passed!");

/*
 *const Counter = ({ value, onIncrement, onDecrement }) => (
 *  <div>
 *    <h1>{value}</h1>
 *    <button onClick={onIncrement}>+</button>
 *    <button onClick={onDecrement}>-</button>
 *  </div>
 *);
 */

class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.value}</h1>
        <button onClick={this.props.onIncrement}>+</button>
        <button onClick={this.props.onDecrement}>-</button>
      </div>
    );
  }
};

const store = createStore(counter);
const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
