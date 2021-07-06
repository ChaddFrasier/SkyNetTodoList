import {
  Button,
  Form,
  Divider
} from 'semantic-ui-react';

const SignInForm = (props) => {
    switch( props.loggedIn )
    {
        case false:
            return (
                <>
                <Form onSubmit={props.signInSubmitFunc}>
                    <Button type="submit" className="App-login">
                        Sign In
                    </Button>
                </Form>
                </>
              );

        case true:
            return (
                <>
                <Form onSubmit={props.signOutSubmitFunc}>
                    <Button type="submit" className="App-login">
                        Sign Out of Skynet
                    </Button>
                    <Divider className="App-IDbox">
                    {props.userID}
                    </Divider>
                </Form>
                </>
              );

        default:
            return (
                <>
                <Form>
                    <Button type="button" className="App-login">
                        Connecting to MySky ...
                    </Button>
                </Form>
                </>
              );
    }
};

export default SignInForm;