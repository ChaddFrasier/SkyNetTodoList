import {
  Button,
  Form,
  Divider,
  Container
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
                    <Container className="flex-box">
                        <Button
                        className="App-data-btn"
                        onClick={props.loadData}
                        content="Load Data"
                        type="button"/>
                        <Button
                        type="button"
                        className="App-data-btn"
                        onClick={props.uploadData}
                        content="Save Data"/>
                    </Container>
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