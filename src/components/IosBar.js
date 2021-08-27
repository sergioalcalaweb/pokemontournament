import React from 'react'

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const IosBar = () => {

  if(!isIOS) return null;

  return (
    <div className='helper' />
  )
  
}

export default IosBar
