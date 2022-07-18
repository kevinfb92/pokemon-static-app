import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useState } from 'react'
import { Layout } from '../../components/layouts';
import { PokemonDataFull, PokemonListResponse } from '../../interfaces';
import { fetchPokemonData } from '../../utils/fetchPokemonData';
import { isFavorite, toggleFavorite } from '../../utils/localFavorites';
import { pokeApi } from '../api';

type Props = {
  pokemon: PokemonDataFull
}

const PokemonByNamePage = ({pokemon}: Props) => {
  
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
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons: PokemonListResponse = await(await fetch(`${pokeApi.baseURL}/pokemon?limit=151`)).json()
  const pokemon151 = pokemons.results.map(poke => ({params: {name: poke.name}}))

  return {
    paths: pokemon151,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {name} = params as {name: string}

  return {
    props: {
      pokemon : await fetchPokemonData(name)
    },
  };
};



export default PokemonByNamePage