import Pokemon from '../components/Pokemon';
import PokemonList from '../components/PokemonList';

import PokemonState from '../context/Pokemon/PokemonState';


export default function Home() {
  return (
    <PokemonState>
      <div className='grid grid-cols-3 mx-2'>
        <PokemonList />
        <Pokemon />
      </div>
    </PokemonState>
  )
}
