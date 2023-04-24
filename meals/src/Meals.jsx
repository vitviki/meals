import { useGlobalContext } from "./Context"
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"


const Meals = () => {

    const { meals, loading, mealSelected, addToFavorites, removeFromFavorites, isMealInFavorites } = useGlobalContext()

    if (loading ){
        return <section className="section">
            <h4>Loading....</h4>
        </section>
    }

    if (meals.length < 1) {
        return <section className="section">
            <h4>No meals matched your search term. Please try again.</h4>
        </section>
    }
    return (
        <section className="section-center">
        {
            meals.map((meal) => {
                const { idMeal, strMeal: title, strMealThumb: image} = meal
                return <article key={idMeal} className="single-meal">
                    <img src={image} className="img" onClick={() => mealSelected(idMeal)}/>
                    <footer>
                        <h5>{title}</h5>                          
                        {isMealInFavorites(idMeal)
                            ? <button className="unlike-btn" onClick={() => removeFromFavorites(idMeal)}><FaThumbsUp /></button>
                            : <button className="like-btn" onClick={() => addToFavorites(idMeal)}><FaRegThumbsUp /></button>

                        }
                    </footer>
                </article>
            })
        }
        </section>
    )
}

export default Meals