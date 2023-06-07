import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Recipes.module.css";

type Props = {
  data: Character | null;
  error: string | null;
  characterID: string | string[] | undefined;
};

const character = ({ data, characterID }: Props) => {
  if (!data) {
    return <div>Error: Character not found</div>;
  }

  return (
    <div className={styles.moreInfoPage}>
      <Link href="/characters">
        <button>Go back</button>
      </Link>

      <h2>{data.name}</h2>
      <p>Status: {data.status}</p>
      <p>Gender: {data.gender}</p>
      <img src={data.image} alt={data.name} />
      <h2>Test for passing information with context</h2>
      <p>Test - character ID from context.params is: {characterID}</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link
          href={
            characterID == "1"
              ? "/characters/20"
              : `/characters/${characterID && +characterID - 1}` // + before the variable convert it to type number cause it's a string
          }
        >
          <button>Prev</button>
        </Link>
        <Link
          href={
            characterID == "20"
              ? "/characters/1"
              : `/characters/${characterID && +characterID + 1}` // + before the variable convert it to type number cause it's a string
          }
        >
          <button>Next</button>
        </Link>
      </div>
    </div>
  );
};

export default character;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [];
  for (let i = 1; i <= 20; i++) {
    paths.push({ params: { characterID: i.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  if (!context.params) {
    return {
      props: {
        data: null,
        error: "CharacterID is not provided in the context",
        characterID: undefined,
      },
    };
  }
  const characterID = context.params.characterID;
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${characterID}`
    );
    const data: Character = await response.json();
    return {
      props: { data, error: null, characterID }, // pass it here
    };
  } catch (error) {
    console.error("Something went wrong with fetching the character :", error);
    return {
      props: {
        data: null,
        error: "Something went wrong with fetching the character",
        characterID: undefined,
      },
    };
  }
};
