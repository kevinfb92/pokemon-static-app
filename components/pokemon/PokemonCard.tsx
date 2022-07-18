import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { PokemonData } from "../../interfaces";

type Props = {
  pokemon: PokemonData;
};

const PokemonCard: React.FC<Props> = ({ pokemon: { id, name, img } }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/name/${name}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card isHoverable isPressable onClick={onClick}>
        <Card.Body css={{ p: 1, pt: 10 }}>
          <Card.Image src={img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text>#{id}</Text>
            <Text transform="capitalize">{name}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
