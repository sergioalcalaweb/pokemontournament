import { Divider, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'

const CupText = () => {
  return (
    <Fragment>
      <Typography variant='subtitle1'>Reglas de copa CU</Typography>
      <Divider />
      <br></br>
      <Typography component='p' variant='body1'>
        La Copa CU se llevará a cabo con la participación de todos los integrantes de las dos divisiones (Trainee y Élite). Será un torneo a eliminación directa y estará dividido en las siguientes fases: dieciseisavos de final, octavos de final, cuartos de final, semifinal y final. Se jugará a un set de 3 combates en todas las categorías, exceptuando la final (set de 5 combates). El ganador de la copa no tendrá derecho a ascender a la División Élite (en caso de estar en la división trainee) o de mantener su posición en caso de haber descendido en la temporada.
      </Typography>

    </Fragment>
  )
}

export default CupText
