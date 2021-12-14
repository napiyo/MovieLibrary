import Authentication from "./screens/Authentication";
import firebase from "./firebaseConfig";
import auth from "./firebaseConfig";
import Home from "./screens/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import Myplaylists from "./screens/Myplaylists";
function App() {
  const user = auth.currentUser;
  return (
 

    <Router>
    <Routes>

      <Route  path="/" element={<Home />} />

      <Route path="auth" element={<Authentication />} />
      <Route path="my-playlists" element={<Myplaylists />} />

     
      {/* <Navigate to="/" /> */}
    </Routes>
  </Router>
  
    
  );
}

export default App;
