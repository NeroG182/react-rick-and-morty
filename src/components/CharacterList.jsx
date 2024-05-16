import { useEffect, useState } from "react"//useState para guardar variables y mostrarlas en interfaz
import Character from './Character'



function NavPage(props) {
    return (
        //Puede ser un div en vez de un header
        <div className="d-flex justify-content-between align-item-center">
           <button
                className="btn btn-success btn-sm"
                onClick={() => props.setPage(Math.max(props.page - 1, 1))} // Limita el valor mínimo a 1
                disabled={props.page === 1} // Deshabilita el botón si está en la primera página
            >
                Pag {props.page - 1}
            </button>
            <button
                className="btn btn-success btn-sm"
                onClick={() => props.setPage(Math.min(props.page + 1, props.totalPages))} // Limita el valor máximo al número total de páginas
                disabled={props.page === props.totalPages} // Deshabilita el botón si está en la última página
            >
                Pag {props.page + 1}
            </button>
        </div>
    )
}

function CharacterList() {
    const [characters, setcharacters] = useState([])
    const [loading, setLoading] = useState(true)//true porque significa que esta cargando
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1); // Nuevo estado para almacenar el número total de páginas

    useEffect(() => {//sirve para que se ejecute cada vez que se refresque la pagina y siempre van juntas las palabras --async-await
        async function fetchData() {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)//es asincrono y como se espera una respuesta se le pone el await y la almacena en response(respuesta)
                                                                                            //Aqui es como si pusiera ?page=1
                                                                                            //Para usar la concatenacion con page usar ` comilla hacia la izquierda
            const data = await response.json()
            setLoading(false)
            setcharacters(data.results);
            setTotalPages(data.info.pages); // Actualiza el número total de páginas
        }

        fetchData()
    }, [page])

    /*if (loading){
        return (
        <div>Cargando</div>
        )
    }*///esto es lo mismo que esto loading ? <h1>Cargando</h1> pero se coloca abajo para que no espere a cargar toda la pagina a que sea false
    return (//recorre el Arreglo de characters.map(character => es lo que recorre)

        <div className='container bg-dark' style={{ paddingBottom: '100px' , paddingTop: '100px'}}>

            <NavPage page={page} setPage={setPage} totalPages={totalPages}/>

            {
                loading ? (<h1>Cargando</h1>) :
                    (
                        <div className="row d-flex align-items-center h-100">
                            {characters.map(character => {
                                return (//el HIjo directo es el que tiene que contener el Key
                                    <div className="col-12 col-md-6 col-lg-4 mb-5 d-flex align-items-stretch" key={character.id}>
                                        <Character character={character} />
                                    </div>
                                );
                            })}
                        </div>
                    )

            }

            <NavPage page={page} setPage={setPage} totalPages={totalPages}/>
            
        </div >
    )
    


}

export default CharacterList
