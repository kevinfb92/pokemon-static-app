import { Container, Grid, Image, Text } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { getFavorites } from '../../utils/localFavorites'
import NoFavorites from '../../components/favorites/noFavorites'
import Favorite from '../../components/favorites/favorite'

const Favorites = () => {
  const [favorites, setFavorites] = useState<number[]>()
  useEffect(() => {
    setFavorites(getFavorites())

  }, [])
  

  return (
    <Layout title="Pokémon - Favorites">
      {
        favorites?.length 
        ? <Grid.Container gap={2} justify='flex-start'>
            {favorites?.map(id => <Favorite key={id} id={id}/>)}
          </Grid.Container>
        : <NoFavorites/>
      }
    </Layout>
  )
}

export default Favorites