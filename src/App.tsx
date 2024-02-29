import React, { useEffect } from "react";
import io from 'socket.io-client';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";


type RegisterType = {
  id_venta: number;
  contenido: string;
  precio: number;
};

export const App: React.FC<{}> = () => {
  const [registerData, setRegisterData] = React.useState<RegisterType>({
    id_venta: 0,
    contenido: "",
    precio : 0
  });

  const dataRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const {
        id_venta,
        contenido,
        precio
      } = registerData;

      const response = await axios.post("https://hexagonal-1.onrender.com/ventas", {
        id_venta,
        contenido,
        precio
      });

      if (response) {
        console.log("Registro exitoso");

        setRegisterData({
          id_venta: 0,
          contenido: " ",
          precio: 0,
        });
      } else {
        console.error("Error al registrar");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const socket = io("https://websocketserver-utr2.onrender.com");
  
    socket.on("newUser", (message) => { 
      alert("Ciclo concluido" + message);
    });
  
  }, []);
  
  

  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh"}}
        >
          <Grid item>
            <Paper sx={{ padding: "1.2em", borderRadius: "15px" }}>
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography
                  variant="h5"
                  justifyContent="center"
                  sx={{ mt: 1, mb: 1 }}
                >
                  $ Ventas $
                </Typography>
              </Stack>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  name="id_venta"
                  margin="normal"
                  fullWidth
                  label="Ingresa el id de la venta"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  type="number"
                  onChange={dataRegister}
                  value={registerData.id_venta}
                />
            
                <TextField
                  name="contenido"
                  margin="normal"
                  fullWidth
                  label="Ingresa el contenido de la venta"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataRegister}
                  value={registerData.contenido}
                />

<TextField
                  name="precio"
                  margin="normal"
                  fullWidth
                  label="Ingresa el precio"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  type="number"
                  onChange={dataRegister}
                  value={registerData.precio}
                />
                <Stack spacing={2} direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 3 }}
                  >
                    Registrar
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};