import { AppBar, Container, Toolbar, Typography, Box, Button, Link } from '@mui/material'
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return <Container>
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    LinguaFlash
                </Typography>
                <Button sx={{ color: 'white', backgroundColor: 'black' }}>
                    <Link href='/sign-in'>Login</Link>
                </Button>
                <Button sx={{ color: 'white', backgroundColor: 'black' }}>
                    <Link href='/sign-up'>Sign Up</Link>
                </Button>
            </Toolbar>
        </AppBar>

        <Box display='flex' flexDirection='column' justifyContent='center' alighItems='center'>
            <Typography variant='h4'>Sign Up</Typography>
            <SignUp />
        </Box>
    </Container>
}