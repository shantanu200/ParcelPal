import { Box } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";
import pallete from "../../../utils/color";
import {
  Inventory,
  LocalShipping,
  PendingActions,
  Timeline,
} from "@mui/icons-material";

const Card = styled(Box)`
  padding: 1rem;
  border: 1px solid ${pallete.purple};
  border-radius: 5px;
`;

const Content = styled.h2``;

const NumberPackage = styled.p`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
`;

const Item = styled.span`
  font-size: 2rem;
  margin-left: 1rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

function CardCatelog({ data }) {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "2rem 1rem",
        margin: "1rem 0",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px",
        }}
      >
        <Card>
          <Content>Packages</Content>
          <NumberPackage>
            <Inventory />
            <Item>{data?.packages?.length}</Item>
          </NumberPackage>
          <Link href={`/package/manage/${data?._id}`}>Manage Packages</Link>
        </Card>
        <Card>
          <Content>Delivered Packages</Content>
          <NumberPackage>
            <LocalShipping />
            <Item>{data?.packages?.length}</Item>
          </NumberPackage>
          <Link href="/">Delivered Packages</Link>
        </Card>
        <Card>
          <Content>Ongoing Packages</Content>
          <NumberPackage>
            <Timeline />
            <Item>{data?.packages?.length}</Item>
          </NumberPackage>
          <Link href="/">Track Packages</Link>
        </Card>
        <Card>
          <Content>Scheduled Packages</Content>
          <NumberPackage>
            <PendingActions />
            <Item>{data?.packages?.length}</Item>
          </NumberPackage>
          <Link href="/">Scheduled Packages</Link>
        </Card>
      </Box>
    </Box>
  );
}

export default CardCatelog;
