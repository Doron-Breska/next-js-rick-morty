import { useRouter } from "next/router";
import React from "react";

type Props = {};

const id = (props: Props) => {
  const router = useRouter();
  console.log("this is the router object :", router.query);
  return (
    <div>
      <h3>This is the page for Recipe # {router.query.id}</h3>
    </div>
  );
};

export default id;
