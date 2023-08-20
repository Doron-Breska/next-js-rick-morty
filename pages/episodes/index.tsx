import React, { useState, useEffect } from "react";

interface Character {
  image: string;
}
interface EpisodeDATA {
  characters: Character[];
  name: string;
}

const EpisodesIndex = () => {
  const [data, setData] = useState<EpisodeDATA[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seNum, setSeNum] = useState<string>("S01");

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const graphql = JSON.stringify({
        query: `
        query {\n  episodes(filter:{episode: \"${seNum}\"}) {\n      results{\n          name\n          characters{\n              image\n          }\n\n      }\n  }\n}\n`,
        variables: {},
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
      };

      try {
        const response = await fetch(
          "https://rickandmortyapi.com/graphql",
          requestOptions
        );
        const result = await response.json();
        const data: EpisodeDATA[] = result.data.episodes.results;
        setData(data);
      } catch (error) {
        console.error(
          "Something went wrong with fetching the episodes :",
          error
        );
        setError("Something went wrong with fetching the characters");
      }
    };

    fetchData();
  }, [seNum]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeNum(e.target.value);
  };

  return (
    <div>
      <h1>Episodes</h1>
      <h1>
        <label htmlFor="se">Select a session</label>
      </h1>
      <br />
      <select name="se" onChange={handleSelectChange}>
        <option value="S01">Session 1</option>
        <option value="S02">Session 2</option>
        <option value="S03">Session 3</option>
        <option value="S04">Session 4</option>
        <option value="S05">Session 5</option>
      </select>
      {error && <p>Something went wrong with the fetch</p>}
      <table style={{ width: "90%", margin: "2rem auto" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "10px" }}>#</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Featured Characters
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((episode, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {episode.name}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {episode.characters.map((character, i) => (
                    <img
                      key={i}
                      style={{
                        width: "45px",
                        // marginRight: "10px",
                        // marginBottom: "7px",
                        margin: "7px",
                        border: "1px solid black",
                      }}
                      src={character.image}
                      alt="character-img"
                    />
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodesIndex;
