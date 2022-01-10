import { useReducer } from "react";
import axios from "axios";

import PokemonContext from "./PokemonContext";
import PokemonReducer from "./PokemonReducer";

import { GET_POKEMONS, GET_POKEMON, NEXT } from "../types";

const PokemonState = (props) => {

    const initialState = {
        pokemons: [],
        selectedPokemon: null
    };

    const [state, dispatch] = useReducer(PokemonReducer, initialState);

    const getPokemons = async (current) => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${current}&limit=20`); //898 max!!
            const data = res.data.results;
            
            data.forEach(e => {
                e._id = ("" + e.url).substr(34).replace('/', '')
            });

            dispatch({
                type: GET_POKEMONS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getPokemon = async (id) => {
        try {

            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const { data } = res;

            const desc = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

            data.des = ("" + desc.data.flavor_text_entries[0].flavor_text).replace(`\f`, '')

            dispatch({
                type: GET_POKEMON,
                payload: data
            })

        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <PokemonContext.Provider
            value={{
                pokemons: state.pokemons,
                selectedPokemon: state.selectedPokemon,
                getPokemons,
                getPokemon,
            }}
        >
            {props.children}
        </PokemonContext.Provider>
    )
}

export default PokemonState;