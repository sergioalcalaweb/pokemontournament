import { Divider, makeStyles, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'

const useStyle = makeStyles( theme => ({
  list: {
    marginBottom:10
  }
}) );

const SanctionsText = () => {

  const classes = useStyle();
  return (
    <Fragment>
      <Typography variant='subtitle1'>Sanciones</Typography>
      <Divider />
      <br></br>
      <ul style={{ listStyleType:'decimal' }}>        
        <Typography component='li' className={classes.list}>
          El jugador elige a un pokémon no permitido (legendario, mítico, singular o que no cumpla con la regla especial).
          <ul style={{ listStyleType:'disclosure-closed' }}>
            <Typography component='li'>
              El jugador perderá el combate en curso y podrá jugar los otros combates del set.
            </Typography>
          </ul>        
        </Typography>
        <Typography component='li' className={classes.list}>
          El jugador se desconecta del combate previo a su finalización por causas de fuerza mayor y con ventaja favorable o desfavorable hacia él.
          <ul style={{ listStyleType:'disclosure-closed' }}>
            <Typography component='li'>
              El combate se repetirá con los mismos equipos del combate interrumpido.
            </Typography>
          </ul>        
        </Typography>
        <Typography component='li' className={classes.list}>
          El jugador se desconecta de forma intencional al tener ventaja o desventaja.
          <ul style={{ listStyleType:'disclosure-closed' }}>
            <Typography component='li'>
              El combate será dado por ganado al contrincante, pudiendo jugar los siguientes combates del set sin ningún problema.
            </Typography>
          </ul>        
        </Typography>
        <Typography component='li' className={classes.list}>
          El jugador no se presenta al combate, pero avisa a su contrincante y/o al jefe del torneo.
          <ul style={{ listStyleType:'disclosure-closed' }}>
            <Typography component='li'>
              El set se pospone a la siguiente jornada, teniendo como límite las 23:59 hrs. del día de la jornada en la que fue pospuesto.
            </Typography>
          </ul>        
        </Typography>
        <Typography component='li' className={classes.list}>
          Los jugadores no se presentan a su set pospuesto.
          <ul style={{ listStyleType:'disclosure-closed' }}>
            <Typography component='li'>
              Se marca como 0-0 el resultado del partido y no se cuenta como ganado, perdido o empatado, pero se cuenta como juego jugado.
            </Typography>
          </ul>        
        </Typography>   
        <Typography component='li' className={classes.list}>
          El jugador no se presenta a su set pospuesto y no avisa a su contrincante (a pesar de ya estar acordado el enfrentamiento).
          <ul style={{ listStyleType:'disclosure-closed' }}>
            <Typography component='li'>
              El contrincante gana el encuentro por default. Se le dan los tres puntos del combate y se marca en la tabla como ganado por 4-0.
            </Typography>
          </ul>        
        </Typography>
        <Typography component='li' className={classes.list}>
          El jugador que cambia su nombre de usuario de pokémon GO estando dentro de un torneo o copa y no dio aviso al administrador.
          <ul style={{ listStyleType:'disclosure-closed' }}>
            <Typography component='li'>
              Suspensión de 3 jornadas y perdida por deafult en caso de copa.
            </Typography>
            <Typography component='li'>
              En caso del playoffs se perderá por default y perderá las primeras 2 jornadas de la siguiente temporada. 
            </Typography>
          </ul>        
        </Typography>   
        <Typography component='li' className={classes.list}>
          El jugador falsifica su resultado totalmente a su favor (exagerar una victoria).
          <ul style={{ listStyleType:'disclosure-closed' }}>
            <Typography component='li'>
              El jugador será castigado con 3 puntos menos y con marcador de 4-0 en el resultado.
            </Typography>
            <Typography component='li'>              
              Reincidencia: El jugador será castigado con 21 puntos menos en la tabla general. En caso de que el jugador no llegue a 21 puntos en el presente torneo, los puntos que falten por restar se deberán aplicar en la siguiente temporada.
            </Typography>
          </ul>        
        </Typography>   
        <Typography component='li' className={classes.list}>
          El jugador denigra y/o agrede física, verbal, escrita o psicológicamente a su contrincante.
          <ul style={{ listStyleType:'disclosure-closed' }}>
            <Typography component='li'>
              El jugador será expulsado del torneo.
            </Typography>
          </ul>        
        </Typography>
                    
      </ul>
      <br></br>
      <Typography>
        El jugador tiene derecho a posponer 4 combates en la Liga CU y a 1 combate en la Copa CU. En caso de fuerza mayor se deberá hablar con el jefe del torneo.
      </Typography>
    </Fragment>
  )
}

export default SanctionsText
