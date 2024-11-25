import {Outlet} from "react-router-dom";

import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";

import Modal from 'react-modal';
import {Toaster} from "@/components/ui/toaster.tsx";

import {ThemeProvider} from "@/components/theme-provider"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthContextProvider} from "@/contexts/authContext/authContext.tsx";
import {useScrollToTop} from "@/hooks/useScrollToTop.tsx";

Modal.setAppElement("#root");

const queryClient = new QueryClient();



function App() {
    useScrollToTop();
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <div className="grid dark:bg-custom-gradient">
                        <Header/>
                        <main className="container p-4 md:p-8 mx-auto">
                            <Outlet/>
                        </main>
                        <Footer/>
                        <Toaster/>
                    </div>
                </QueryClientProvider>
            </AuthContextProvider>
        </ThemeProvider>
    )
}

export default App
