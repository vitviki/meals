import React, { useContext, useEffect, useState } from "react"
import axios from 'axios';

const AppContext = React.createContext()
const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

const AppProvider = ({ children }) => {

    const [ meals, setMeals ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ searchTerm, setSearchTerm] = useState("")
    const [ showModal, setShowModal ] = useState(false)
    const [ selectedMeal, setSelectedMeal ] = useState(null)

    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const { data } = await axios.get(url)
            if (data.meals) {
                setMeals(data.meals)
            } else {
                setMeals([])
            }
        } catch (e) {
            console.log(e.response)
        }
        setLoading(false)
    }

    const searchMeal = () => {
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const mealSelected = (idMeal) => {
        let meal;
        
        meal = meals.find((m) => m.idMeal === idMeal)
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if(!searchTerm) return
        searchMeal()
    }, [searchTerm])
    
    return (
        <AppContext.Provider
            value={{ meals, loading, showModal, selectedMeal, setSearchTerm, fetchRandomMeal, setShowModal, mealSelected, closeModal }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }