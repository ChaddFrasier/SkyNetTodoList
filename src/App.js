import React, { useState, useEffect } from 'react';
import logo from './assets/checkbox_icon.svg';
import './App.css';
import SignInForm from './components/SignInOut'
import ListForm from './components/ListForm'
import ListDisplay from './components/ListDisplay'
import Loading from './components/Loader'
import { ContentRecordDAC } from '@skynetlabs/content-record-library';
import { Header, Container, Divider } from 'semantic-ui-react';

// Import the SkynetClient and a helper
import { SkynetClient } from 'skynet-js';

// We'll define a portal to allow for developing on localhost.
//const portal = window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;
//const client = new SkynetClient(portal);

// Initiate the SkynetClient
// Note: When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const client = new SkynetClient();

const contentRecord = new ContentRecordDAC();

/** Main Application Func */
function App() {
  const [userID, setUserID] = useState();
  const [mySky, setMySky] = useState();
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(false);

  const [taskText, updateInputText] = useState("");
  const [taskArr, setTaskArr] = useState([]);
  
  const [dataKey, setDataKey] = useState('');
  const [filePath, setFilePath] = useState();

  // When dataKey changes, update FilePath state.
  useEffect(() => {
    setFilePath(dataDomain + '/' + dataKey);
  }, [dataKey]);

  // choose a data domain for saving files in MySky
  const dataDomain = 'localhost';

  // initialization of MySky Login
  useEffect(() => {
    // define async setup function
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain);

        // load necessary DACs and permissions
        await mySky.loadDacs(contentRecord);

        // check if user is already logged in with permissions
        const loggedIn = await mySky.checkLogin();

        // set react state for login status and
        // to access mySky in rest of app
        setMySky(mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await mySky.userID());
        }
      } catch (e) {
        console.error(e);
      }
    }
    // call async setup function
    initMySky();
  }, []);

  /** Sign Out of mySky: basic */
  const signOutSubmitFunc = async () => {
    // call logout to globally logout of mysky
    await mySky.logout();

    //set react state
    setLoggedIn(false);
    setUserID('');
  }

  /** Sign In to mySky: basic */
  const signInSubmitFunc = async () => {
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky.requestLoginAccess();
    // set react state
    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
    }
  }
  
  /** Load Data using the name of the list */
  const loadData = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Use getJSON to load the user's information from SkyDB
    const { data } = await mySky.getJSON(filePath);

    // To use this elsewhere in our React app, save the data to the state.
    if (data) {
      setTaskArr(data.taskArr)
      console.log('User data loaded from SkyDB!');
    } else {
      console.error('There was a problem with getJSON');
    }
    setLoading(false)
  }

  /** Remove specific task from array: *no update to DB* */
  const deleteTask = async (e) => {
    e.preventDefault()
    const removeIndex = Number(e.target.id.split('-')[1])

    setTaskArr(taskArr.slice(0, removeIndex).concat(taskArr.slice(removeIndex+1)))
  }

  /** Add Values to the current list: *no update to DB* */
  const addTaskSubmitFunc = async (e) => {
    e.preventDefault()

    if (taskText === '') {
      return true
    }
    
    // create the new array
    const newArr = taskArr.length > 0 ? taskArr.concat(taskText): [taskText];
    // set the state
    setTaskArr(newArr)

    // reset the input field
    document.getElementById('inputField').value = ""
    updateInputText(document.getElementById('inputField').value)
  }

  /** Save the user list data to mySky */
  const saveDataToSky = async (jsonData) => {
    setLoading(true)
    // Use setJSON to save the user's information to MySky file
    try {
      await mySky.setJSON(filePath, jsonData);

      // Tell contentRecord we updated the color
      await contentRecord.recordInteraction({
        skylink: filePath,
        metadata: { action: 'userUpdatedList' },
      });

    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }

    setLoading(false)
  }

  /** Initate the save sequemce to mySky */
  const uploadData = (e) => {
    e.preventDefault()
    
    if(document.getElementById("listNameInput").value)
    {
      document.getElementById("listNameInput").classList.remove("error")
      setLoading(true)
      const jsonData = {
        taskArr
      }
      saveDataToSky(jsonData)
    }
    else
    {
      // tell the user to input a name
      document.getElementById("listNameInput").classList.add("error")
    }
  }

  const fdSignIn = {
    signInSubmitFunc,
    loggedIn,
    loading,
    signOutSubmitFunc,
    userID,
    uploadData,
    loadData
  }

  const fdList = {
    addTaskSubmitFunc,
    taskText,
    updateInputText,
    loadData,
    setDataKey,
    loading
  }

  const displayData = {
    taskArr,
    deleteTask
  }

  if(loading)
  {
    return (

      <Divider className="App">
        <Header className="App-header">
          <Divider className="flex-box">
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="App-title">Skylist</h2>
          </Divider>
          <Container>
            <SignInForm {...fdSignIn} />
          </Container> 
          <Container>
            <ListForm {...fdList} />
          </Container>
          <Container>
            <Loading />
          </Container>
        </Header>
      </Divider> 
    )
  }
  else
  {
    return (
      <Divider className="App">
        <Header className="App-header">
          <Divider className="flex-box">
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="App-title">Skylist</h2>
          </Divider>
          <Container>
            <SignInForm {...fdSignIn} />
          </Container> 
          <Container>
            <ListForm {...fdList} />
          </Container>
          <Container>
            <ListDisplay {...displayData} />
          </Container>
        </Header>
      </Divider>
    );
  }
}

export default App;
