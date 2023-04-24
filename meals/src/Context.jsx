import React, { useContext, useEffect, useState } from "react"
import axios from 'axios';

const AppContext = React.createContext()
const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

const getFavoritesFromLocalStorage = () => {
    let favorites;

    if (localStorage.getItem("favorites")) {
        favorites = JSON.parse(localStorage.getItem("favorites"))
    } else {
        favorites = []
    }

    return favorites
}

const AppProvider = ({ children }) => {

    const [ meals, setMeals ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ searchTerm, setSearchTerm] = useState("")
    const [ showModal, setShowModal ] = useState(false)
    const [ selectedMeal, setSelectedMeal ] = useState(null)
    const [ favorites, setFavorites ] = useState(getFavoritesFromLocalStorage())

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

    const addToFavorites = (idMeal) => {
        const alreadyExists = favorites.find((m) => m.idMeal === idMeal)

        /* If already exists, remove from favorites */
        if (alreadyExists) 
        {
            removeFromFavorites(idMeal)
            return 
        }

        const meal = meals.find((m) => m.idMeal === idMeal)
        const updatedFavorites = [...favorites, meal]
        setFavorites(updatedFavorites)

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((m) => m.idMeal !== idMeal)
        setFavorites(updatedFavorites)

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
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
            value={{ meals, loading, showModal, selectedMeal, favorites, setSearchTerm, fetchRandomMeal, setShowModal, mealSelected, closeModal, addToFavorites, removeFromFavorites }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }