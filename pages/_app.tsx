import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import Link from "next/link";
import { AppBar, Toolbar, Container, Button, Box } from "@mui/material";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <>
        <AppBar position="static" sx={{ bgcolor: "#333" }}>
          <Toolbar>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="/" passHref>
                <Button
                  sx={{
                    color: "white",
                    fontWeight: router.pathname === "/" ? "bold" : "normal",
                    borderBottom: router.pathname === "/" ? "3px solid #ced6f9" : "none",
                    borderRadius: 0,
                    textTransform: "none", 
                  }}
                >
                  POSTS
                </Button>
              </Link>
              <Link href="/new" passHref>
                <Button
                  sx={{
                    color: "white",
                    fontWeight: router.pathname === "/new" ? "bold" : "normal",
                    borderBottom: router.pathname === "/new" ? "3px solid #ced6f9" : "none",
                    borderRadius: 0,
                  }}
                >
                  Create A Post
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 3 }}>
          <Component {...pageProps} />
        </Container>
      </>
    </Provider>
  );
}
