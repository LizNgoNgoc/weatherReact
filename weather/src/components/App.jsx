import './App.css';
import { Search } from './Searc/Search';
import { Day } from './WeatherDay/WeatherDay';

function App() {
  const setState = {}
  return <main>
    <Search state={setState}/>
    <Day state={setState}/>
  </main>
}

export default App;
