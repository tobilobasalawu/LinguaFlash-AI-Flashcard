import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, Typography, Box, Button, AppBar, Toolbar } from "@mui/material"; 

import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard App</title>
        <meta name="description" content="Flashcard App" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Flashcard App</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

    </Container>
  );
}