function Character({character}) {//para taer el onjeto cargado desde CharacterList tambien se puede usar props pero habira quue ponerselo delante de cada character(props.character)
    return (
        <div className="text-center p-3">
            <h4 className="fw-bolder">{character.name}</h4>
            <img className="imge-fluid rounded-pill" src={character.image} alt={character.name}></img>
            <p>{character.origin.name}</p>
        </div>
    )
}

export default Character

