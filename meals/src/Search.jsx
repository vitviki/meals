import { useState } from "react"
import { useGlobalContext } from "./Context"

const Search = () => {

    const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
    const [ text, setText ] = useState("")

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.length > 0) {
            setSearchTerm(text)
        }
    }

    const randomMeal = () => {
        setSearchTerm("")
        setText("")
        fetchRandomMeal()
    }

    return (
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                <input type="text" value={text || ""} placeholder="search meal" className="form-input" onChange={handleChange} />
                <button type="submit" className="btn">search</button>
                <button type="btn" className="btn btn-hipster" onClick={randomMeal}>surprise me!</button>
            </form>
        </header>
    )
}

export default Search