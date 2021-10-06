import { Divider, Typography } from '@mui/material'
import React, { Fragment } from 'react'

const ChampionsText = () => {
  return (
    <Fragment>
      <Typography variant='subtitle1'>Reglas de campeón de Campeones CU</Typography>
      <Divider />
      <br></br>
      <Typography component='p' variant='body1'>
        Esta competencia enfrentará al campeón de la división Trainee contra el campeón de la división Élite a un set de 5 combates. El ganador de este encuentro se enfrentará al campeón de la Copa CU (en caso de que se haya jugado) a un set de 5 combates.
      </Typography>

    </Fragment>
  )
}

export default ChampionsText
