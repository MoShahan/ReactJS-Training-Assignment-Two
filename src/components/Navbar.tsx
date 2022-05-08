import { Link } from 'react-router-dom'
import "../styles/Navbar.css"

function Navbar({ handleOnChange, searchWord, handleSubmitClick }: any) {
    return (
        <nav>
            <div className="pagesButtons">
                {/* <Link
                    to={{
                        pathname: "/home",
                        search: `?searchWord=${searchWord}`
                    }}
                >
                    <button className="buttonHome">Home</button>
                </Link>

                <Link
                    to={{
                        pathname: "/pageOne",
                        search: `?searchWord=${searchWord}`
                    }}
                >
                    <button className="buttonOne">Page 1</button>
                </Link> */}

                <Link to="/home" ><button className="buttonHome">Home</button></Link>

                <Link to="/pageOne" ><button className="buttonOne">Page 1</button></Link>

                <Link to="/pageTwo" ><button className="buttonTwo">Page 2</button></Link>

                <Link to="/pageThree" ><button className="buttonThree">Page 3</button></Link>

            </div>
            <div className="inpputField">
                <form action="" className='inputForm' onSubmit={handleSubmitClick}>
                    <label htmlFor="searchHere">Search Here: </label>
                    <input
                        id="searchHere"
                        placeholder='Type here to search'
                        onChange={handleOnChange}
                        value={searchWord}
                    />
                    <button type="submit" className='searchButton'> Search </button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar