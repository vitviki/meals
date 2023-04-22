import './App.css'
import { useGlobalContext } from './Context'
import Meals from "./Meals"
import Favorites from "./Favorites"
import Modal from "./Modal"
import Search from "./Search"



function App() {

  const { showModal } = useGlobalContext()
  return (
    <div>
      <Search />
      { /* <Favorites /> */ }
      <Meals />
      { showModal && <Modal /> }
    </div>
  )
}

export default App
