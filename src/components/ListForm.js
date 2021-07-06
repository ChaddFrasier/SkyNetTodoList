import {
    Button,
    Form,
    Input,
    Divider
  } from 'semantic-ui-react';

const ListForm = (props) => {
    return (
        <>
        <br/>
        <Form onSubmit={props.addTaskSubmitFunc}>
            <Divider className="flex-box">
                <Input
                className="App-main-input"
                type="text"
                placeholder="Add a new task"
                onChange={function(e){
                    props.updateInputText(e.target.value)
                }}
                />
                <Button className="App-btn" type="submit">+</Button>
            </Divider>
        </Form>
        </>
    )
};

export default ListForm;