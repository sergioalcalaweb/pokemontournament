import { IconButton, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const Options = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  return(
    <React.Fragment>
      <IconButton
      aria-label="mas opciones"
      aria-controls="long-menu"
      aria-haspopup="true"
      onClick={event => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
            setAnchorEl(null);          
            props.onDelete(props.id);
        }}>Eliminar</MenuItem>        
        { (props.open && !props.finished) && (
          <MenuItem onClick={() => {
              setAnchorEl(null);          
              props.onClose(props.id, props.kind);
          }}>Cerrar Inscripciones</MenuItem>          
        )}
        { (props.open && !props.finished) && (
          <MenuItem onClick={() => {
            setAnchorEl(null);          
            props.addDemo(props.id, props.participants, props.kind);
          }}>Participantes DEMO</MenuItem>          
        )}
        { (props.open && !props.finished) && (
          <MenuItem onClick={() => {
            setAnchorEl(null);          
            props.showParticipants(props.id);
          }}>Ver Participantes</MenuItem>          
        )}
        { (!props.open && !props.finished) && 
          <MenuItem onClick={() => {
            setAnchorEl(null);   
            props.onOpen(props.id);  
          }}>Abrir Inscripciones</MenuItem>
        }
      </Menu>

    </React.Fragment>
  )
}

export default Options
