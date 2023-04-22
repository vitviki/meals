import { useGlobalContext } from "./Context"

const Modal = () => {

    const { selectedMeal, closeModal } = useGlobalContext()
    const { strMealThumb: image, strMeal: title, strInstructions: instructions, strSource: source } = selectedMeal
    return (
        <aside className="modal-overlay">
            <div className="modal-container">
                <img src={image} className="img modal-img" />
                <div className="modal-content">
                    <h4>{title}</h4>
                    <h5>Cooking Instructions</h5>
                    <p>{instructions}</p>
                    <a href={source} target="_blank">Source</a>
                    <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
                </div>
            </div>
        </aside>
    )
}

export default Modal