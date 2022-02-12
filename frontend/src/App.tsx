import { AuthProvider } from "providers/AuthProvider";
import { LoadingProvider } from "providers/LoadingProvider";
import { BrowserRouter } from "react-router-dom"
import { Router } from './router/Router';

function App() {
    return (
        <AuthProvider>
            <LoadingProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </LoadingProvider>
        </AuthProvider>
    );
};

export default App;
