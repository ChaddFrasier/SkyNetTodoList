import {
    Button,
    Form,
    Input,
    Label,
    Divider,
    Segment
  } from 'semantic-ui-react';

const ListForm = (props) => {

    return (
        <>
        <br/>
        <Segment>
            <Form onSubmit={props.addTaskSubmitFunc}>
                <Divider className="flex-box">
                    <Label 
                    className="App-label"
                    content="List Name"
                    />
                    <Input id="listNameInput" className="App-secondary-input" type="text" onChange={function(e){
                        props.setDataKey(e.target.value)
                    }}/>
                </Divider>
                <br/>
                <Divider className="flex-box">
                    <Label
                    className="App-label"
                    content="Add Task"
                    />
                    <Input
                    id="inputField"
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
        </Segment>
        </>
    )
};

export default ListForm;