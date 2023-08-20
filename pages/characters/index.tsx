import React from "react";
import { GetServerSideProps } from "next";
import styles from "../../styles/Recipes.module.css";
import Link from "next/link";
type Props = {
  data: Character[];
  error: null | string;
};

const CharactersPage = (props: Props) => {
  console.log("this is the charecters data from the client side", props.data);
  return (
    <>
      <div className={styles.charactersContainer}>
        {props.data.length > 1 && (
          <>
            {props.data.map((character) => (
              <div className={styles.charcterCard} key={character.id}>
                <img src={character.image} alt={character.name} />
                <h2>{character.name}</h2>
                {/* <p>{character.id}</p> */}
                <Link href={`/characters/${character.id}`}>
                  <button>learn more</button>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CharactersPage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  // console.log("this is the context from the index page", context);
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const result = await response.json();
    const data: Character[] = result.results;
    console.log("these are the characters from the server side :", data);
    return {
      props: { data, error: null },
    };
  } catch (error) {
    console.error("Something went wrong with fetching the characters :", error);
    return {
      props: {
        data: [],
        error: "Something went wrong with fetching the characters",
      },
    };
  }
};
