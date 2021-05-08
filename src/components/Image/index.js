import React from 'react'
import Img from 'react-cool-img';
import Pokeball from '../../assets/pokeball.webp'

const Image = ({path, alt = 'Untitle', style }) => {
  return (
    <Img placeholder={Pokeball} src={path} alt={alt} style={style} />
  )
}

export default Image
