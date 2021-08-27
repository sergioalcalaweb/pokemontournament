import React from 'react'
import Img from 'react-cool-img';
import Pokeball from '../assets/pokeball.webp'

const Image = ({path, alt = 'Untitle', ...other }) => {
  return (
    <Img placeholder={Pokeball} src={path} alt={alt} {...other}  />
  )
}

export default Image
