import { Divider, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'

const ObligationsText = () => {
  return (
    <Fragment>
      <Typography variant='subtitle1'>Obligaciones de los concursantes</Typography>
      <Divider />
      <br></br>
      <Typography component='p' variant='body1'>
        Los jugadores deben de estar al pendiente del rol de juego, de las redes sociales y de la aplicación para poder tener información de sus combates y/o cualquier otra información que resulte relevante.
      </Typography>
      <br></br>
      <Typography component='p' variant='body1'>
        Tratar a los demás competidores con respeto, evitando burlas o comentarios despectivos.
      </Typography>
      <br></br>
      <Typography component='p' variant='body1'>
        Ser honesto al entregar los resultados de sus combates y de los equipos de pokémon que utilizará.
      </Typography>

    </Fragment>
  )
}

export default ObligationsText
