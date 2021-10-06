import { Avatar, Box, Button, Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "120px",
    height: "120px",
  },
}));

const DetailTopic = ({ topic }) => {
  const classes = useStyles();
  const [copied, setCopied] = useState(false);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="center"
        width="100%"
      >
        {topic.types.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width={{ xs: "100%", md: "50%" }}
          >
            <Typography variant="subtitle2">Tipos Permitidos</Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-around"
              alignItems="center"
              mt={3}
              width="100%"
            >
              {topic.types.map((type, index) => (
                <Chip
                  key={index}
                  label={type.name}
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                  avatar={
                    <Avatar
                      alt={type.name}
                      src={`../types/${type.image}.png`}
                    />
                  }
                />
              ))}
            </Box>
          </Box>
        )}
        {topic.pokes.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width={{ xs: "100%", md: "50%" }}
          >
            <Typography variant="subtitle2">Pokemon Baneados</Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-around"
              alignItems="center"
              width="100%"
            >
              {topic.pokes.map((poke, index) => (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  key={index}
                >
                  <Avatar
                    alt={poke.name}
                    src={poke.image}
                    variant="square"
                    className={classes.large}
                  />
                  <Typography>{poke.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        mt={3}
        width="100%"
      >
        {topic.description && (
          <Box width={{ xs: "100%", md: "60%" }}>
            <Typography>Màs información:</Typography>
            <Typography variant="body1">{topic.description}</Typography>
          </Box>
        )}
        {topic.code && (
          <Box
            display="flex"
            flexDirection="column"
            width={{ xs: "100%", md: "40%" }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => copy(topic.code)}
              startIcon={<FileCopyIcon />}
            >
              Copiar Codigo para pokémon GO
            </Button>
            {copied && (
              <Typography align="center" color="primary">
                Copiado !!
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DetailTopic;
