import React from 'react';
import Modal from './components/modal'
import MainComponent from './components/mainComponent';
import MainHeader from './components/MainHeader';
import SplashScreen from './components/splashScreen';
// import Modal from './Modal'; // Import your Modal component or any other component

// Main App component
function App() {
    
    // State to control the visibility of the Modal (if you're using it)
    const [isModalOpen, setModalOpen] = React.useState(false);
    //state to control the visibility of the splash screen
    const [showMainComponent, setshowMainComponent] = React.useState(false);

    // Function to toggle the modal's visibility
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const navigateToMainComponent = () => {
        setshowMainComponent(!showMainComponent);
    }

    return (
        <div className="App">
            {/* <header className="App-header"> */}
            {/* <MainHeader/> */}
            {!showMainComponent ? (
                <SplashScreen navigateToMainComponent={navigateToMainComponent} />
            ) : (
                <MainComponent />
            )}
            {/* </header> */}
        </div>
    );
}

export default App;
