import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Recipes.module.css";

type Props = {
  data: Data;
};

const Recipes = (props: Props) => {
  const { data } = props;
  console.log("here we access data from the client side :", data);
  return (
    <div>
      <h1>all recipes !</h1>
      <Link href="/recipes/1" className={styles.border}>
        link to the first recipe
      </Link>
      <br />
      <Link href="/recipes/2">link to the second recipe</Link> <br />
      <Link href="/recipes/3">link to the third recipe</Link>
    </div>
  );
};

export default Recipes;

interface Data {
  message: string;
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  context
) => {
  const data = { message: "Hello world from the server !" };
  console.log("data from the serevr side :", data);
  return { props: { data: data } };
};
