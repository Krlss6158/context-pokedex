import { GET_POKEMON, GET_POKEMONS } from '../types';

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload,
            }
        case GET_POKEMON:
            return {
                ...state,
                selectedPokemon: payload
            }
        default: return state;
    }
}