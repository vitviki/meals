import { useGlobalContext } from "./Context"
import { BiLike } from "react-icons/bi"

const Meals = () => {

    const { meals, loading, mealSelected } = useGlobalContext()

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
                        <button className="like-btn"><BiLike /></button>
                    </footer>
                </article>

            })
        }
        </section>
    )
}

export default Meals