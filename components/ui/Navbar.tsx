import { Image, Link, Spacer, Text, useTheme } from '@nextui-org/react'
import NextLink from 'next/link';
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
    const { theme } = useTheme();
  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '10px 20px',
        backgroundColor: 'red'
    }}>
        <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="app icon" width={70} height={70}/>
        <NextLink passHref href="/">
            <Link>
                <Text color='white' h2>P</Text>
                <Text color='white' h3>okémon</Text>
            </Link>
        </NextLink>


        <Spacer css={{flex: '1'}}/>
        <NextLink passHref href="/favorites">
            <Link>
                <Text color='white' h3>Favorites</Text>
            </Link>
        </NextLink>
    </div>
  )
}

export default Navbar