import { IStarWarCharacterInfo } from "../lib/utils/types";

export default function StartWarTable({
  data,
}: {
  data: IStarWarCharacterInfo[];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Character</th>
          <th>Films</th>
          <th>Vehicles</th>
        </tr>
      </thead>
      <tbody>
        {data.map((character) => {
          return (
            <tr key={character.name}>
              <td>{character.name}</td>
              <td>{character.films?.toString()}</td>
              <td>{character.vehicles?.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
