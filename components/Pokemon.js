import { useContext } from "react";
import PokemonContext from "../context/Pokemon/PokemonContext";
import Pokeball from '../assets/img/pokeball.png';

const Pokemon = () => {
    const { selectedPokemon } = useContext(PokemonContext);

    return (
        <div className='h-screen flex'>
            {
                selectedPokemon ?
                    <CardPokemon selectedPokemon={selectedPokemon} />
                    :
                    <PokeballLoading />
            }
        </div>
    );
}

const CardPokemon = ({ selectedPokemon }) => {
    return (
        <div className='flex items-center justify-center'>
            <div className='flex items-center justify-center flex-col rounded-xl border p-5'>
                <img
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${("000" + selectedPokemon.id).slice(-3)}.png`}
                    width={150} height={150}
                />
                <h1 className='uppercase font-semibold'>{`${selectedPokemon.name} #${selectedPokemon.id}`}</h1>
                <small>{`${selectedPokemon.des}`}</small>
                <div className='w-full relative flex items-center justify-center'>
                    <small className='z-10 relative'>Exp: {selectedPokemon.base_experience} </small>
                    <div className={`${selectedPokemon.types[0].type.name}-300 w-full h-3 absolute top-1 right-0 z-0 rounded-lg`}></div>
                    <div className={`${selectedPokemon.types[0].type.name}-500 h-3 absolute top-1 left-0 z-0 rounded-lg`} style={{ width: selectedPokemon.base_experience }}></div>
                </div>
                <div className='mt-1'>
                    <small className='font-semibold'>Type: </small>
                    {
                        selectedPokemon.types.map((e, key) => {
                            return (
                                <small className={`${e.type.name}-300 mr-1 p-1 rounded-xl`} key={key}>
                                    {`${e.type.name}`}
                                </small>
                            )
                        })
                    }
                </div>
                <div className='p-4'>
                    <p className='w-full text-left font-semibold'>Statistics</p>
                    <div className='flex flex-wrap'>
                        {
                            selectedPokemon.stats.map((e, key) => {
                                return (
                                    <small key={key} className='w-1/2'>
                                        {`${e.stat.name}: ${e.base_stat} `}
                                    </small>
                                );
                            })
                        }
                    </div>
                </div>
                <div>
                    <p className='w-full font-semibold'>Evolutions</p>
                    <div className='flex items-center flex-wrap justify-center'>

                    </div>
                </div>
            </div>

        </div>
    );
}

const PokeballLoading = () => {
    return (
        <div className='flex items-center justify-center w-full'>
            <div className='relative'>
                <div className='bg-red-500 animate-ping rounded-full absolute w-10 h-10 top-7 left-7'></div>
                <img src={Pokeball.src} width={100} className=' relative pokeball' />
            </div>
        </div>
    );
}

export default Pokemon;