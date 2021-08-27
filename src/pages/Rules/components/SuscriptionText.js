import { Divider, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'

const SuscriptionText = () => {
  return (
    <Fragment>
      <Typography variant='subtitle1'>Inscripción y requisitos de participación</Typography>
      <Divider />
      <br></br>
      <ul>
        <Typography component='li'>
          Este torneo se realizará en la aplicación “Pokémon GO” a través de la modalidad de juego llamada “Combate pvp” en la categoría “Super League”. Esta categoría tiene como límite el uso de pokémon igual o inferiores a 1500 PC (puntos de combate) y, para efectos del torneo, no se permitirá el uso de pokémon legendarios, singulares, míticos y oscuros (exceptuando las jornadas especiales y/o reglas especiales donde sí se permitan).
        </Typography>
        <Typography component='li'>
          Al registrarse en la plataforma se deberá de registrar con el nombre de entrenador en Pokémon GO así como el ID de entrenador tal como aparece en la app. 
        </Typography>
        <Typography component='li'>
          Los concursantes, dependiendo del número de los mismos, serán divididos en divisiones de acuerdo a su anterior participación en el Campeonato CU o a su inscripción al Campeonato CU: reloaded. Serán dos divisiones: <strong>la división élite y la división trainee</strong>.
        </Typography>
        <Typography component='li'>
          En la Copa CU, no habrá divisiones.
        </Typography>
        <Typography component='li'>
          En caso de ser su primera temporada, el jugador se incorporará a la división trainee; en caso de tener una o más temporadas en el torneo, el jugador se incorporará a la división en la cual estuvo en el último torneo jugado; y, en caso de haberse ausentado uno o más torneos, el jugador iniciará forzosamente en la división trainee, sin importar que no haya descendido en su última participación.
        </Typography>
        <Typography component='li'>
          Para efectos de contacto entre los jugadores, se pondrá a su disposición una plataforma especial para llevar el control de sus encuentros y sus torneos. En ella, deberá ingresar su código de entrenador (no QR) y su nickname antes de la fecha de inicio del torneo.
        </Typography>        
      </ul>

    </Fragment>
  )
}

export default SuscriptionText
