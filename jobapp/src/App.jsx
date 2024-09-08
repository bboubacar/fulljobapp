import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Offres from "./pages/offres/Offres";
import Candidat from "./pages/candidat/Candidat";
import Recruteur from "./pages/recruteur/Recruteur";
import ConnexionCandidat from "./pages/connexion/ConnexionCandidat";
import ConnexionRecruteur from "./pages/connexion/ConnexionRecruteur";
import { menuPaths } from "./utilities/constantes";
import Newuser from "./pages/inscription/Newuser";
import Congratulation from "./pages/inscription/Congratulation";
import { tables } from "./utilities/db_infos";
import Details from "./pages/offres/Details";
import Pdf from "./pages/recruteur/Pdf";
import Confirmation from "./components/Confirmation";
import Admin from "./pages/admin/Admin";
import ConnexionAdmin from "./pages/connexion/ConnexionAdmin";
import Conditions from "./pages/footer/Conditions";
import Politiques from "./pages/footer/Politiques";
import Mentions from "./pages/footer/Mentions";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <PageError />,
        children: [
            {
                path: menuPaths.home,
                element: <Home />,
            },
            {
                path: menuPaths.offres,
                element: <Offres />,
            },
            {
                path: menuPaths.offres + "/:id",
                element: <Details />,
            },
            {
                path: menuPaths.contact,
                element: <Contact />,
            },
            {
                path: menuPaths.connexionCandidat,
                element: <ConnexionCandidat table={tables.candidats} />,
            },
            {
                path: menuPaths.connexionRecruteur,
                element: <ConnexionRecruteur table={tables.representants} />,
            },
            {
                path: menuPaths.connexionAdmin,
                element: <ConnexionAdmin table={tables.admin} />,
            },
            {
                path: menuPaths.candidat,
                element: <Candidat />,
            },
            {
                path: menuPaths.recruteur,
                element: <Recruteur />,
            },
            {
                path: menuPaths.admin,
                element: <Admin />,
            },
            {
                path: menuPaths.newUser,
                element: <Newuser table={tables.candidats} />,
            },
            {
                path: menuPaths.newRecruteur,
                element: <Newuser table={tables.representants} />,
            },
            {
                path: menuPaths.congrat,
                element: (
                    <Congratulation connPath={menuPaths.connexionCandidat} />
                ),
            },
            {
                path: menuPaths.congrat2,
                element: (
                    <Congratulation connPath={menuPaths.connexionRecruteur} />
                ),
            },
        ],
    },
    {
        path: menuPaths.docs,
        element: <WithoutHeaderFooter />,
        children: [
            { path: menuPaths.cv + "/:id", element: <Pdf /> },
            { path: menuPaths.conditions, element: <Conditions /> },
            { path: menuPaths.politiques, element: <Politiques /> },
            { path: menuPaths.mentions, element: <Mentions /> },
        ],
    },
]);

function Main() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Confirmation />
            <Footer />
        </>
    );
}

function WithoutHeaderFooter() {
    return (
        <main>
            <Outlet />
        </main>
    );
}

function PageError() {
    return <div>Cette page n'existe pas encore</div>;
}

function App() {
    return <RouterProvider router={router} />;
}

export default App;
