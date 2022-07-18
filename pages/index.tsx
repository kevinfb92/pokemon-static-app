import type { GetStaticProps, NextPage } from 'next'
import {Layout} from '../components/layouts'
import { pokeApi } from './api'
import { PokemonListResponse, PokemonData } from '../interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { PokemonCard } from '../components/pokemon'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pokemonListRes = await fetch(`${pokeApi.baseURL}/pokemon?limit=151`)
  const json = await pokemonListRes.json() as PokemonListResponse

  const pokemons: PokemonData[] = json.results.map(
    (pokemon,i)=>(
        {
          ...pokemon,
          id: i+1,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
        }
      )
  )
  return(
    {
      props:{
        pokemons
      }
    }
  )
}

interface Props {
  pokemons: PokemonData[]
}

const HomePage: NextPage<Props> = ({pokemons}) => {
  return(
    <>
      <Layout title='Pokemon List'>
        <Grid.Container gap={2} justify='flex-start'>
          {
            pokemons.map((pokemon)=>(
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          }
        </Grid.Container>
      </Layout>
    </>
  )
}

export default HomePage
