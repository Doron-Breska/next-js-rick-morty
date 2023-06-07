import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";

type Props = {
  data: Character | null;
  error: string | null;
};

const character = ({ data }: Props) => {
  if (!data) {
    return <div>Error: Character not found</div>;
  }

  return (
    <div>
      <Link href="/characters">
        <button>Go back</button>
      </Link>

      <h2>{data.name}</h2>
      <p>Status: {data.status}</p>
      <p>Gender: {data.gender}</p>
      <img src={data.image} alt={data.name} />
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
  console.log("this is the Context object :", context);
  // Check if context.params is defined
  if (!context.params) {
    return {
      props: {
        data: null,
        error: "CharacterID is not provided in the context",
      },
    };
  }
  // Another way - "const characterID = context.params!.characterID" instead of the check above.
  const characterID = context.params.characterID;
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${characterID}`
    );
    const data: Character = await response.json();
    console.log("this is the character data from the server side:", data);
    return {
      props: { data, error: null },
    };
  } catch (error) {
    console.error("Something went wrong with fetching the character :", error);
    return {
      props: {
        data: null,
        error: "Something went wrong with fetching the character",
      },
    };
  }
};
