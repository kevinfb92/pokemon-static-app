import { Card, Grid } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

type Props = {
  id: number;
};

const Favorite: FC<Props> = ({ id }) => {
  const router = useRouter();

  const onFavoriteClicked = () => {
    router.push(`pokemon/${id}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable css={{ padding: 10 }} onPress={onFavoriteClicked}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
};

export default Favorite;
