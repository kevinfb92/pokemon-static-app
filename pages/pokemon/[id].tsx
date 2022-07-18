import { NextPage } from "next";
import React from "react";
import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { pokeApi } from "../api";
import { PokemonDataFull } from "../../interfaces";
import { Layout } from "../../components/layouts";
import {isFavorite, toggleFavorite} from "../../utils/localFavorites"; 
import confetti from 'canvas-confetti';
import { fetchPokemonData } from "../../utils/fetchPokemonData";

type Props = {
  pokemon: PokemonDataFull;
};

const PokemonDetail: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(isFavorite(pokemon.id))
  const onToggleFavorite = () => {
    toggleFavorite(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if(isInFavorites) return
    confetti({
      particleCount: 200,
      startVelocity: 20,
      angle: -270,
      spread: 360,
      decay: 1,
      gravity: 0,
      origin: {
        x: 0.8,
        y: 0.2
      }
    })
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
                alt={pokemon.name}
                width={"100%"}
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button color="gradient" ghost={!isInFavorites} onClick={onToggleFavorite}>
                {isInFavorites ? "Undo favorite" : "Save favorite"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

type pathParams = {
  params: string;
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  let pokemon151: {params: {id: string}}[] = [];
  for (let i = 0; i < 151; i++) {
    pokemon151.push({ params: { id: `${i + 1}` } });
  }

  return {
    paths: pokemon151,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  return {
    props: {
      pokemon: await fetchPokemonData(id)
    },
  };
};

export default PokemonDetail;
