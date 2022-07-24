import './App.css';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import { useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { signOutUser } from './redux/store';
import { useDispatch } from 'react-redux'

function App() {

  initializeApp(firebaseConfig)
  const navigate = useNavigate();

  const auth = getAuth();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("SUCCESS");
      dispatch(signOutUser());
    }).catch((error) => {
      // An error happened.
      console.log("FAIL", error);
    });
  }

  const userName = useSelector(state => { 
    if(state.value){
      return state.value.displayName
    }
   });
  console.log("useSelector", userName);

  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>
        LOGIN APP
      </h1>
      {userName ? 
      <>
        <h2>Hi, {userName}</h2>
        <button onClick={handleSignOut}>
          Sign out
        </button>
      </>
      :
      <>
        <h2>
          Hi, USERNAME
        </h2>
        <button onClick={() => navigate('/login')}>Login</button>
      </>
      }
    </div>
  );
}

export default App;
