import { useState } from 'react';
import Login from './pages/login/Login.jsx'; 
import Home from './pages/home/Home.jsx';    

function App() {
  const [userId, setUserId] = useState(null);  // Estado para armazenar o ID do usuário
  console.log('setUserId:', setUserId);

  return (
    <div>
      {!userId ? (
        <Login setUserId={setUserId} />  // Passando setUserId para Login como prop
      ) : (
        <Home userId={userId} />         // Passando userId para Home
      )}
    </div>
  );
}

export default App;
