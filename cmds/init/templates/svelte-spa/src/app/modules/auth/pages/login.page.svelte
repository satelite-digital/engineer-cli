<script>
import { Auth } from 'Templates'
import { Group, Text, Card, Input, Button } from "Atoms";

import { getContext } from "svelte";
import { push } from "svelte-spa-router";

const { client, session } = getContext('services');
    
    let user = {
        username : "",
        password : ""
    }

    let userSession;


const login = async ()=>{
    try{
        userSession = await client.auth.signIn(user);
        session.setSession(userSession);
        push('/home')
    }catch(err){
        alert('login failed')
    }
    
    
}

</script>

<Auth backgroundURL="https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2048&q=80">
    <Group height="auto" width="32em">
        <Card padding="4em">
            <Group direction="column" justify="center" alignItems="center" placeContent="center" margin="0em 0em 2em 0em">
                <!-- Login title -->
                <h1>Inicia Sesión</h1>
                <Text margin="0em 0em 2em 0em">Ingresa con tus credenciales</Text>
                <!-- Login form -->
                <Input placeholder="usuario@correo.com" clearable margin="0em 0em 2em 0em" bind:value={user.username}/>
                <Input type="password" placeholder="******" togglePassword bind:value={user.password}/>
                <!-- Login action -->
                <Button pill width="100%" margin="2em 0em 2em 0em" on:click={login}>Iniciar sesión</Button>
                <!-- Forgot password -->
                <Text href="/#/forgot">¿Has olvidado tu contraseña?</Text>
            </Group>
        </Card>
    </Group>
</Auth>