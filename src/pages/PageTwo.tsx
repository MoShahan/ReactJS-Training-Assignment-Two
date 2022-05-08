import Navbar from '../components/Navbar'

function PageTwo({ handleOnChange, searchWord, handleSubmitClick }: any) {

    return (
        <div>
            <Navbar handleSubmitClick={handleSubmitClick} handleOnChange={handleOnChange} searchWord={searchWord} />
            <h1>Page Two</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore iusto dolores placeat sapiente impedit velit possimus sunt ratione in deleniti, at nulla ipsam quis id, eum perspiciatis dolor neque dolorum eligendi eaque excepturi dignissimos, autem quo officia! Culpa sunt facilis nostrum. Assumenda aspernatur veniam expedita ut, sed officia magnam animi delectus modi voluptates. Reprehenderit, laboriosam. Quibusdam ratione suscipit amet? Sint quia laborum, in quo corporis dolore nobis dicta laudantium omnis! Exercitationem alias unde optio natus aut dolorem cumque laboriosam, laudantium quod earum odit rem cum consequatur voluptatibus consequuntur doloremque asperiores beatae fuga vitae eveniet architecto. Vel quia cupiditate quidem reiciendis.</p>
        </div>
    )
}

export default PageTwo