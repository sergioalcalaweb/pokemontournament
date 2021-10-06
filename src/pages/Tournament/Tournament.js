import {
  Box,
  Button,
  Container,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { withNotification } from "../../HOC/Notification";
import useTournaments from "../../hooks/useTournaments";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  inputs: {
    width: "48%",
  },
}));

const Tournament = ({ showNotification }) => {
  const classes = useStyle();
  const {
    register,
    handleSubmit,
    errors,
    control,
    formState: { isSubmitting },
  } = useForm();

  const { create } = useTournaments();
  let history = useHistory();

  const onSubmit = async (formData) => {
    await create({ ...formData, day: 0 });
    showNotification("Torneo creado exitosamente");
    history.push("/torneos");
  };

  return (
    <Fade in timeout={{ appear: 600, enter: 500 }}>
      <Container>
        <Box paddingTop={5}>
          <Typography variant="subtitle2">Nuevo Torneo</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box p={2} component={Paper}>
              <TextField
                error={!!errors.title}
                label="Nombre"
                name="title"
                variant="outlined"
                fullWidth
                inputRef={register({
                  required: "El campo es obligatorio",
                })}
                helperText={errors.title?.message}
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <FormControl
                  error={!!errors.kind}
                  variant="outlined"
                  className={classes.inputs}
                >
                  <InputLabel>Tipo</InputLabel>
                  <Controller
                    control={control}
                    name="kind"
                    defaultValue=""
                    rules={{ required: "El campo es requerido" }}
                    as={
                      <Select label="Tipo">
                        <MenuItem value="">Selecciona un tipo</MenuItem>
                        <MenuItem value={"liga"}>Liga</MenuItem>
                        <MenuItem value={"copa"}>Copa</MenuItem>
                      </Select>
                    }
                  />
                  <FormHelperText>{errors.kind?.message}</FormHelperText>
                </FormControl>
                <FormControlLabel
                  className={classes.inputs}
                  control={
                    <Controller
                      name="open"
                      control={control}
                      defaultValue={false}
                      render={({ onChange, value, ref }) => (
                        <Switch
                          onChange={(e) => onChange(e.target.checked)}
                          checked={value}
                          inputRef={ref}
                        />
                      )}
                    />
                  }
                  label="Abierto a inscripciones"
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Guardar
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </Fade>
  );
};

export default withNotification(Tournament);
