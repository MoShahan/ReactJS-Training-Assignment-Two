import Navbar from '../components/Navbar'

function PageOne({ handleOnChange, searchWord, handleSubmitClick }: any) {

    return (
        <div>
            <Navbar handleSubmitClick={handleSubmitClick} handleOnChange={handleOnChange} searchWord={searchWord} />
            <h1>Page One</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ex. Ab optio obcaecati nam fugit rerum quae voluptas cupiditate illo ratione debitis, nostrum quibusdam, temporibus nesciunt recusandae dolore tempora. Ducimus laboriosam molestias, rerum officiis quam, assumenda voluptas labore facere accusantium eius provident vel ipsum quia incidunt omnis. Ipsa, quae numquam!</p>
        </div>
    )
}

export default PageOne