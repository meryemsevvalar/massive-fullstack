import AppRouter from './AppRouter';
import './App.css';

function App() {
  return (
    <div className="App">
      <ul>
        <li><a href='http://localhost:3000/table' className='first'>Table</a></li>
        <li><a href='http://localhost:3000/pie' className='second'>Pie</a></li>
      </ul>

      <AppRouter />
      
    </div>
  );
}

export default App;
