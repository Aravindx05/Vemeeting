import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LockIcon from "@mui/icons-material/Lock";
import { blueGrey } from "@mui/material/colors";

export default function Authentication() {
  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 3fr" },
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            px: 8,
            background:
              "linear-gradient(135deg, #FF9839 0%, #FF6A00 100%)",
            color: "white",
          }}
        >
          <Typography variant="h2" fontWeight={700} mb={2}>
            Vemeet
          </Typography>
          <Typography variant="h5" maxWidth={420}>
            Connect with your loved ones anytime, anywhere.
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
                "linear-gradient(135deg, #f0f0f0 0%, #d9d9d9 100%)",
            px: 3,
          }}
        >
          <Paper
            elevation={12}
            sx={{
              width: "100%",
              maxWidth: 420,
              p: 4,
              borderRadius: 3,
            }}
          >
            {/* Header */}
            <Stack alignItems="center" spacing={1} mb={2}>
              <LockIcon
                sx={{
                  bgcolor: "#FF9839",
                  color: "white",
                  p: 1,
                  borderRadius: "50%",
                }}
              />
              <Typography variant="h5" fontWeight={600}>
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to continue
              </Typography>
            </Stack>

            {/* Form */}
            <Box component="form">
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                required
              />

              <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.4,
                  borderRadius: 2,
                  backgroundColor: "#FF9839",
                  "&:hover": {
                    backgroundColor: "#e87f1f",
                  },
                }}
              >
                Sign In
              </Button>

              <Typography
                align="center"
                sx={{ mt: 2, cursor: "pointer" }}
                color="primary"
              >
                Forgot password?
              </Typography>

              <Divider sx={{ my: 3 }}>OR</Divider>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ py: 1.2, borderRadius: 2 }}
              >
                Continue with Google
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 3 }}
              >
                Don&apos;t have an account?{" "}
                <span style={{ color: "#FF9839", cursor: "pointer" }}>
                  Sign up
                </span>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
