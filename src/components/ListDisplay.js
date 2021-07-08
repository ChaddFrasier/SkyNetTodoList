import {
    Form,
    Table,
    Button  } from 'semantic-ui-react';

const ListDisplay = (props) => {
    const taskItems = props.taskArr.map((task, i) => {

        return (
            <Table.Row key={i} id={i} className="table">
                <Table.Cell className="button-column">
                    <Form id={`deleteForm-${i}`} onSubmit={props.deleteTask}>
                        <Button id={`deleteBtn-${i}`} type="submit" className="App-list-btn">x</Button>
                    </Form>
                </Table.Cell>
                <Table.Cell className="App-list-view">{task}</Table.Cell>
            </Table.Row>
        )
    });
    
    if(props.taskArr.length > 0) {
        return (
            <>
            <Table>
                <Table.Body>
                    {taskItems}
                </Table.Body>
            </Table>
            </>
        )
    }
    
    return (
        <>
        </>
    )

};

export default ListDisplay;