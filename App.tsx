import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./hooks/Auth";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Stack, Text } from "@chakra-ui/react";
import { Dashboard } from "./pages/Dashboard";
import { Template } from "./pages/Template";
import { BuildResume } from "./pages/BuildResume";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile";
import { Pricing } from "./pages/Pricing";
import { DownloadResume } from "./pages/DownloadResume";
import { DownloadTemplate } from "./pages/DownloadTemplate";
import ProtectedRoute from "./shared/Protected";
import { ResetPassword } from "./pages/ResetPassword";
import { supabaseClient } from "./config/supabase";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/store";



function ScrollToTop() {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    async function getAuthStatus() {
      const {data} = await supabaseClient.auth.getUser();
      if(data?.user?.id){
        dispatch(setUser(data?.user));
        if(pathname === '/login' || pathname === '/signup'){
          navigate('/dashboard');
        }
      }
    }

    getAuthStatus();
  }, []);

  return null;
}

function App() {
  return (
    <Stack h={"full"} bg={"brand.main"}>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route
              path="/version"
              element={
                <>
                  <Text fontSize={"18px"} fontWeight={800}>
                    Version == {import.meta.env.VITE_DEPLOYEMENT_VERSION}
                  </Text>
                </>
              }
            />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/template"
              element={
                <ProtectedRoute>
                  <Template />
                </ProtectedRoute>
              }
            />
            <Route
              path="/build-resume"
              element={
                <ProtectedRoute>
                  <BuildResume />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pricing"
              element={
                <ProtectedRoute>
                  <Pricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/download-resume"
              element={
                <ProtectedRoute>
                  <DownloadResume />
                </ProtectedRoute>
              }
            />
            <Route
              path="/download-template"
              element={
                <ProtectedRoute>
                  <DownloadTemplate />
                </ProtectedRoute>
              }
            />
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Stack>
  );
}

export default App;
