import React from 'react';
import api from './services/api';

// const App = () => {
//   return (
//     <div className="App">
//   <h1>bork</h1>
//     </div>
//   );
// }

class App extends React.Component {
  async componentDidMount() {
    const result = await api.call('post', 'login', {
      username: 'blakiepoo132222',
      password: 'Nathalie201'
    })
    console.log(result)
  }
  render() {
    return <div>app works</div>
  }
}
export default App;
