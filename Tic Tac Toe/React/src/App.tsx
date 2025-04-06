import Game from "./components/Game"
import './App.css'

function App() {

  return (
    <>
      <Game gridSize={3}/>
      <form >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="FirstName"/>
          <span>Please Provide as same as govt id</span>
        </div>
      </form>
    </>
  )
}

export default App
