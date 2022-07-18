import { Image } from '@nextui-org/react'
import Head from 'next/head'
import React, { ReactNode } from 'react'
import { Navbar } from '../ui'

type Props = {
    children?: ReactNode,
    title?: string
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

const Layout:React.FC<Props> = ({children, title}) => {

  return (
    <>
        <Head>
            <title>{title || 'Pokemon App'}</title>
            <meta name="author" content="Kevin Folgar"/>
            <meta name="description" content="Pokemon information"/>
            <meta name="keywords" content="pokemon, pokedex"/>
            <meta property="og:title" content="PokemonApp" />
            <meta property="og:description" content="A Next.js pokemon app to save yoru favorite pokemon" />
            <meta property="og:image" content={`${origin}/img/pokemon.webp`}/>

        </Head>
        <Navbar/>
        <main style={{
            padding: '20px 20px',
        }}>
            {children}
        </main>
    </>
  )
}

export default Layout