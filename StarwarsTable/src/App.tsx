import { useEffect, useState } from "react";
import "./App.css";
import { IStarWarCharacterInfo } from "./lib/utils/types";
import getCharacters from "./lib/service/getCharacters";
import getFilm from "./lib/service/getFilms";
import getVehicle from "./lib/service/getVehicle";
import StartWarTable from "./components/StartWarTable";

function App() {
  const [starWarInfo, setStarWarInfo] = useState<IStarWarCharacterInfo[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const characters = await getCharacters();
        const characterDetails:IStarWarCharacterInfo[] = await Promise.all(
          characters.map(async (character) => {
            const [films, vehicles] = await Promise.all([
              Promise.all(character.films.map(getFilm)),
              Promise.all(character.vehicles.map(getVehicle))
            ]);

            return {
              name: character.name,
              films,
              vehicles
            };
          })
        );

        setStarWarInfo(characterDetails)
      } catch (error) {
        console.error(error)
      }
    })();
  }, []);

  return (
    <>
      <h2>Start War Table</h2>
      <StartWarTable data={starWarInfo}></StartWarTable>
    </>
  );
}

export default App;
