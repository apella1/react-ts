import { createContext, useContext, useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

function usePokemonSource(): { pokemon: Pokemon[] } {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("./pokemon.json")
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, []);

  return { pokemon };
}

const ThemeContext = createContext("light");
const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

// ? What are the benefits of not using useContext within PokemonList
function usePokemon() {
  return useContext(PokemonContext);
}

const PokemonList = () => {
  const theme = useContext(ThemeContext);
  const { pokemon } = usePokemon();
  return (
    <div>
      <p>Theme: {theme}</p>
      <ul>
        {pokemon.map((p) => {
          <li key={p.id}>{p.name}</li>;
        })}
      </ul>
    </div>
  );
};

const Context = () => {
  return (
    <ThemeContext.Provider value="dark">
      <PokemonContext.Provider value={usePokemonSource()}>
        <div>
          <h2>Context</h2>
          <PokemonList />
        </div>
      </PokemonContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Context;
