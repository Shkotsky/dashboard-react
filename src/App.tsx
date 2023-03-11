import './assets/styles/_main.scss';
import Routing from './routes/Routing';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <Routing />
      </div>
    </div>
  );
}

export default App;
