import React from 'react';
import {Provider} from 'react-redux';
import decode from 'jwt-decode';

import api from '../services/api';
import {store} from '../store/store';
import {setCurrentUser, addError, setToken} from '../store/actions';

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try{
    store.dispatch(setCurrentUser(localStorage.jwtToken))
  } catch(err){
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}

const App = () => {
  return (
    <Provider store= {store}>
    <div className="App">
  <h1>bork</h1>
    </div>
    </Provider>
  );
}

// class App extends React.Component {
//   async componentDidMount() {
//     const result = await api.call('post', 'login', {
//       username: 'blakiepoo132222',
//       password: 'Nathalie201'
//     })
//     console.log(result)
//   }
//   render() {
//     return <div>app works</div>
//   }
// }
export default App;
