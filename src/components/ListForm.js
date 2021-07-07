import {
    Button,
    Form,
    Input,
    Label,
    Divider
  } from 'semantic-ui-react';

const ListForm = (props) => {
    return (
        <Form onSubmit={props.addTaskSubmitFunc}>
            <br/>
            <Label
            className="App-label"
            content="Add Task"
            />
            <Divider className="flex-box">
                <Input
                className="App-main-input"
                type="text"
                placeholder="Go to the store"
                onChange={function(e){
                    props.updateInputText(e.target.value)
                }}
                />
                <Button className="App-btn" type="submit">+</Button>
            </Divider>
        </Form>
    )
};

export default ListForm;