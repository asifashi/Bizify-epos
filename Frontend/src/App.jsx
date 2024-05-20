import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useAuth } from './Authcontext/Authcontext';



function App() {
  const { isloggedIn } = useAuth();
  return (
    <Routes>
      <Route path="/dashboard/*" element={isloggedIn ? <Dashboard/> :  <Navigate to="/auth/sign-in" /> } />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
   
      
      
      
    </Routes>
  );
}

export default App;

