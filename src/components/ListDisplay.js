import {
    Divider
  } from 'semantic-ui-react';

const ListDisplay = (props) => {
    
    if(props.taskArr.length) {
        return (
            <>
            <Divider> 
                Hello World! the current task array has {props.taskArr.length} number of tasks.
            </Divider>
            </>
        )
    }
    
    return (
        <>
        </>
    )

};

export default ListDisplay;