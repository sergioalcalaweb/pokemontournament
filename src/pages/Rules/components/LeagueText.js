import { Divider, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'

const LeagueText = () => {
  return (
    <Fragment>
      <Typography variant='subtitle1'> Reglas de la liga CU</Typography>
      <Divider />
      <br></br>
      <Typography component='p' variant='body1'>
        El formato de este torneo será todos contra todos a una sola vuelta. Los jugadores que se enfrentarán deberán de jugar 4 combates (a estos cuatro combates se les llamará set) con los siguientes resultados posibles: 4-0, 3-1, 2-2, 1-3, 0-4. Si el jugador “a” obtiene un resultado de 4-0 o 3-1, ganará el set y se le otorgarán 3 puntos, mientras que al jugador “b” se le otorgarán 0 puntos y viceversa; en caso de quedar 2-2, tanto al jugador “a” como al jugador “b” se le otorgará el empate y 1 punto a cada jugador. El ganador del combate deberá de dar de alta el resultado del encuentro. En caso de que el jugador derrotado dé de alta el resultado y esté equivocado en su favor el marcador final, se aplicará la regla 8.        
      </Typography>
      <br></br>
      <Typography variant='subtitle2'>Los criterios de desempate serán los siguientes:</Typography>
      <br></br>
      <ul style={{ listStyleType:'decimal' }}>
        <Typography component='li'>
          Puntos obtenidos a lo largo de las jornadas
        </Typography>
        <Typography component='li'>
          Diferencia (DJ) entre los combates ganados (CG) y los combates jugados (CJ)
        </Typography>
        <Typography component='li'>
          Sets ganados a lo largo del torneo (SG)
        </Typography>
        <Typography component='li'>
          Combates ganados a lo largo del torneo (CG)
        </Typography>
        <Typography component='li'>
          Sets perdidos a lo largo del torneo (SP)
        </Typography>
        <Typography component='li'>
          Combates perdidos a lo largo del torneo (CL)
        </Typography>
        <Typography component='li'>
          Porcentaje obtenido de dividir CG entre CJ (CGCJ)
        </Typography>
        <Typography component='li'>
          Sets empatados a lo largo del torneo (SE)
        </Typography>
        <Typography component='li'>
          Enfrentamientos directos entre los jugadores
        </Typography>
        <Typography component='li'>
          En caso de que los anteriores criterios de desempate sean insuficientes para resolver la igualdad entre dos o más jugadores, se procederá a realizar un set de tres combates entre los jugadores implicados en el desempate
        </Typography>
      </ul>
      <br></br>
      <Typography component='p' variant='body1'>
        Este formato es aplicable para las dos divisiones.
      </Typography>        
      <br></br>
      <Typography variant='subtitle1'>Sistema de Divisiones (división élite y división trainee)</Typography>
      <Divider />
      <br></br>
      <Typography component='p' variant='body1'>
        La división trainee estará conformada por __ jugadores, mientras que la división élite estará conformada por 16 jugadores. Estas divisiones tendrán un sistema de ascenso y descenso:
      </Typography>      
      <br></br>
      <ul>
        <Typography component='li'>
          Los finalistas (campeón y subcampeón de la temporada 12 del Campeonato CU) ascenderán automáticamente a la división élite.
        </Typography>
        <Typography component='li'>
          El penúltimo (lugar 15) y último lugar (lugar 16) de la temporada 12 del Campeonato CU descenderán a la liga trainee directamente.
        </Typography>
        <Typography component='li'>
          El tercer lugar de la temporada 1 del Campeonato CU: reloaded y el antepenúltimo lugar (lugar 14) de la temporada 1 del campeonato CU: reloaded se enfrentarán a un set de 5 combates para definir el último lugar para la división élite: en caso de que gane el set el jugador perteneciente a la división trainee, ascenderá a la división élite y el jugador perteneciente a la división élite descenderá a la división trainee. En caso de que el jugador perteneciente a la división elite gane el set, no habrá cambios en sus respectivas divisiones.
        </Typography>
      </ul>
      <br></br>
      <Typography variant='subtitle2'>Reglas especiales</Typography>
      <br></br>
      <Typography component='p' variant='body1'>
        Las reglas especiales son jornadas donde se podrá utilizar exclusivamente ciertos tipos de pokémon. En la fase regular del torneo, el jugador podrá elegir su equipo libremente, siempre y cuando cumpla con la regla especial establecida y sea menor a 1500 PC. En los playoffs, se establecerá un plazo de tiempo en donde los competidores tendrán que seleccionar y enviar al jefe de torneo su equipo con 6 pokémon que cumplan con esta regla y sean menores de 1500PC. 
      </Typography>
      <br></br>
      <Typography variant='subtitle2'>Playoffs</Typography>
      <br></br>
      <Typography component='p' variant='body1'>
        Para definir al campeón de cada división, con base a los criterios de desempate, se ordenarán a los jugadores de la siguiente forma:
      </Typography>
      <br></br>
      <ul>
        <Typography component='li'>
          los jugadores del lugar 1 al lugar 6 obtendrán su pase a los playoffs de forma directa.
        </Typography>
        <Typography component='li'>
          los jugadores del lugar 7 al lugar 10 jugarán un repechaje de un set de 5 combates para obtener uno de los dos boletos a los playoffs. Se enfrentarán de la siguiente forma:
        </Typography>
        <Typography align='center'>
          7mo. lugar vs. 10mo. lugar.          
        </Typography>
        <Typography align='center'>          
          8vo. lugar vs. 9no. lugar.
        </Typography>
        <Typography component='li'>
          Se jugarán tres fases de playoffs: cuartos de final, semifinal y final.
        </Typography>        
        <Typography component='li'>
          Los combates de la fase de <strong>cuartos de final</strong> y <strong>semifinal</strong> serán a un set de 3 combates, mientras que <strong>el juego por el tercer lugar y la final</strong> será a un set de 5 combates. Este formato es aplicable para ambas divisiones.
        </Typography>
      </ul>

    </Fragment>
  )
}

export default LeagueText
