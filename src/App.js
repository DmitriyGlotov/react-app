import './App.css';



const searchPanel = <input type="text" className="search-input" placeholder="type to search" />

const buttonAdd = <button type="button" textContent="Add">Add</button>

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        {searchPanel}
        {buttonAdd}
      </header>
    </div>
  );
}

export default App;
