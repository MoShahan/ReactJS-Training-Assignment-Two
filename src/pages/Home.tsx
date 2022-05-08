import Navbar from '../components/Navbar'

function Home({ handleOnChange, searchWord, handleSubmitClick }: any) {
    return (
        <div>
            <Navbar handleOnChange={handleOnChange} searchWord={searchWord} handleSubmitClick={handleSubmitClick} />
            <h1>Home Page</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, natus.</p>
        </div>
    )
}

export default Home