import './style.css';
import search from '../../Assets/search-icon.svg';



function SearchButton() {
    return (
        <div className="search-button">
            <input placeholder="Pesquisa" type="search" />
            <img className="search-icon" src={search} alt="search icon" />
        </div>
    )
}

export default SearchButton;