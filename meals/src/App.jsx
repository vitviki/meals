import './App.css'

import Meals from "./Meals"
import Favorites from "./Favorites"
import Modal from "./Modal"
import Search from "./Search"

function App() {


  return (
    <div>
      <Search />
      { /* <Favorites /> */ }
      <Meals />
      { /* <Modal /> */ }
    </div>
  )
}

export default App
