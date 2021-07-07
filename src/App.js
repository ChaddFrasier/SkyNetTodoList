import React, { useState, useEffect } from 'react';

import logo from './assets/checkbox_icon.svg';
import './App.css';
import SignInForm from './components/SignInOut'
import ListForm from './components/ListForm'
import ListDisplay from './components/ListDisplay'
import { ContentRecordDAC } from '@skynetlabs/content-record-library';
import { Header, Container, Divider } from 'semantic-ui-react';
// Import the SkynetClient and a helper
import { SkynetClient } from 'skynet-js';

// We'll define a portal to allow for developing on localhost.
const portal = window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;
// Initiate the SkynetClient
// Note: When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const client = new SkynetClient(portal);
const contentRecord = new ContentRecordDAC();

/** Basic Application UI */
function App() {
  const [userID, setUserID] = useState();
  const [mySky, setMySky] = useState();
  const [loggedIn, setLoggedIn] = useState(null);

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

  // initialization of MySky login
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

  const signOutSubmitFunc = async () => {
    // call logout to globally logout of mysky
    await mySky.logout();

    //set react state
    setLoggedIn(false);
    setUserID('');
  }

  const signInSubmitFunc = async () => {
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky.requestLoginAccess();

    // set react state
    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
    }
  }

  const addTaskSubmitFunc = async (e) => {
    console.log("Adding this new task to the taskArr")
    e.preventDefault()

    if (taskText === '') {
      return true
    }
    const newArr = taskArr.length > 0 ? taskArr.concat(taskText): [taskText];

    setTaskArr(newArr)
    // reset the input field
    e.target[0].value = ""
    updateInputText(e.target[0].value)
  }

  const generateRandomTask = () => {
    const min = 1,
      max = 1000;

      return min + Math.random() * ( max-min )
  }

  const fdSignIn = {
    signInSubmitFunc,
    loggedIn,
    signOutSubmitFunc,
    userID
  }

  const fdList = {
    addTaskSubmitFunc,
    taskText,
    updateInputText
  }

  const displayData = {
    taskArr
  }

  return (
    <div className="App">
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
        <Container className="flex-box">
          <ListDisplay {...displayData} />
        </Container>
      </Header>
    </div>
  );
}

export default App;
