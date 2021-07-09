// Logo
import logo from '../assets/skynet_logo.svg';
// css
import './Loading.css';

// Loading is a loading screen
const Loading = () => {
  return (
    <>
      <p>Loading...</p>
      <img src={logo} className="App-loader" alt="logo" />
    </>
  );
};

export default Loading;