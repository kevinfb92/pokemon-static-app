import { Container, Text, Image } from "@nextui-org/react";
import React from "react";

const NoFavorites = () => {
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "calc(100vh - 200px)",
        justifyContent: "center",
      }}
    >
      <Text h1>No favorites</Text>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        alt="Ditto image"
        width={250}
        height={250}
        css={{
          opacity: 0.1,
        }}
      />
    </Container>
  );
};

export default NoFavorites;
