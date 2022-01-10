import { useContext, useEffect, useState } from "react";
import PokemonContext from "../context/Pokemon/PokemonContext";
const PokemonList = () => {

    const pokemonContext = useContext(PokemonContext);
    const [current, setCurrent] = useState(0);
    const handleNext = () => {
        if (current < 880) {
            setCurrent(current + 20);
        }
        pokemonContext.getPokemons(current);
    }

    const handlePrevious = () => {
        if (current > 0) {
            setCurrent(current - 20);
        }
        pokemonContext.getPokemons(current);
    }

    useEffect(() => {
        pokemonContext.getPokemons(current);
    }, [])

    return (
        <div className='col-span-2'>
            <div className='flex flex-wrap'>
                {
                    pokemonContext.pokemons.length ?
                        pokemonContext.pokemons.map((e, key) => {
                            return (
                                e._id <= 898 &&
                                <a
                                    className='border py-3 pl-3 font-medium uppercase flex items-center flex-auto m-1 w-64'
                                    key={key}
                                    href='#'
                                    onClick={() => pokemonContext.getPokemon(e._id)}
                                >
                                    <img
                                        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${("000" + e._id).slice(-3)}.png`}
                                        className='rounded-full mr-4'
                                        width={75}
                                        height={75} />
                                    <div className='flex flex-col justify-center'>
                                        <small>{`${e.name}`}</small>
                                        <small>{`#${e._id}`}</small>
                                    </div>
                                </a>
                            )
                        }) : null
                }
            </div>
            <div className='flex items-center justify-center m-4 space-x-4'>
                <ButtonNav name='Previous' onClick={handlePrevious} background={pokemonContext.selectedPokemon ? `${pokemonContext.selectedPokemon.types[0].type.name}-500` : 'bg-gray-600 text-white'} />
                <ButtonNav name='Next' onClick={handleNext} background={pokemonContext.selectedPokemon ? `${pokemonContext.selectedPokemon.types[0].type.name}-500` : 'bg-gray-600 text-white'} />

            </div>
        </div>
    )
}

const ButtonNav = ({
    background,
    onClick,
    name
}) => {
    return (
        <button onClick={onClick} className={`${background} py-2 px-5 rounded-xl font-medium`}  >{name}</button>
    );
}

export default PokemonList;