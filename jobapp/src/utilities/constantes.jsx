import { GrUserWorker } from "react-icons/gr";
import { LiaFileContractSolid } from "react-icons/lia";
import { FaCity } from "react-icons/fa";

export const githubDomain = "/emploiideal";

export const menuPaths = {
    home: "/",
    offres: "/offres",
    contact: "/contact",
    connexionCandidat: "/candidat/connexion",
    connexionRecruteur: "/recruteur/connexion",
    connexionAdmin: "/admin/connexion",
    candidat: "/candidat/dashboard",
    recruteur: "/recruteur/dashboard",
    admin: "/admin/dashboard",
    newUser: "/candidat/inscription",
    newRecruteur: "/recruteur/inscription",
    congrat: "/candidat/congratulation",
    congrat2: "/recruteur/congratulation",
    docs: "/docs",
    cv: "cv",
    conditions: "conditions_generales",
    politiques: "politiques",
    mentions: "mentions_legales",
};

export const userToken = "token";
export const offreData = "offre";
export const searchStore = "search";
export const fromOffre = "fromOffre";

export const sousMenuNames = {
    candidat: "Candidat",
    entreprise: "Entreprise",
    dashboard: "Dashboard",
    deconnexion: "Deconnexion",
};

export const connexionSousmenu = {
    title: "Connexion",
    content: [
        {
            title: sousMenuNames.candidat,
            path: menuPaths.connexionCandidat,
        },
        {
            title: sousMenuNames.entreprise,
            path: menuPaths.connexionRecruteur,
        },
    ],
};

export const profileSousmenu = {
    title: "Profile",
    content: [
        {
            title: sousMenuNames.dashboard,
            path: "",
        },
        {
            title: sousMenuNames.deconnexion,
            path: "",
        },
    ],
};

export const menuItem = [
    {
        title: "Accueil",
        path: menuPaths.home,
    },
    {
        title: "Offres",
        path: menuPaths.offres,
    },
    {
        title: "Contact",
        path: menuPaths.contact,
    },
];

export const homeListe = [
    {
        title: "Metiers",
        icon: <GrUserWorker />,
        details:
            "Des métiers variés offrant un épanouissement professionnel et une satisfaction salariale.",
    },
    {
        title: "Villes",
        icon: <FaCity />,
        details:
            "Découvre des d'opportunités professionnelles uniques dans des villes dynamiques.",
    },
    {
        title: "Contrats",
        icon: <LiaFileContractSolid />,
        details:
            "Explore des contrats flexibles et captivants pour une croissance professionnelle  unique.",
    },
];

export const dashboardName = {
    experiences: "experiences",
    competences: "competences",
    formations: "formations",
    candidatures: "candidatures",
};

export const dashboardTab = [
    {
        name: dashboardName.experiences,
        title: "expériences",
        contents: [],
    },
    {
        name: dashboardName.competences,
        title: "compétences",
        contents: [],
    },
    {
        name: dashboardName.formations,
        title: "formations",
        contents: [],
    },
    {
        name: dashboardName.candidatures,
        title: "candidatures",
        contents: [],
    },
];

export const recruteurDashboardName = {
    offres: "offres",
    candidatsOffre: "candidatsOffre",
    rechercher: "rechercher",
};

export const recruteurDashboardTab = [
    {
        name: recruteurDashboardName.offres,
        title: "Offres",
        contents: [],
    },
    {
        name: recruteurDashboardName.candidatsOffre,
        title: "Candidatures",
        contents: [],
    },
    {
        name: "rechercher",
        title: "Rechercher",
        contents: [],
    },
];

export const typeContrat = [
    {
        title: "selectionnez",
        value: "",
    },
    {
        title: "Alternance",
        value: "alternance",
    },
    {
        title: "CDD",
        value: "cdd",
    },
    {
        title: "CDI",
        value: "cdi",
    },
    {
        title: "Interim",
        value: "interim",
    },
    {
        title: "Stage",
        value: "stage",
    },
    {
        title: "Saisonnier",
        value: "saisonnier",
    },
];

export const userValide = {
    valid: "valide",
    attente: "en attente",
};

export const notifSms = {
    session: "Session expiré",
    addSucces: "Ajouté avec succès",
    addFail: "Échec d'ajout.",
    modifSucces: "Modifié avec succès",
    modifFail: "Échec de modification.",
    supprSucces: "Supprimé avec succès",
    supprFail: "Échec de suppression.",
    sent: "Candidature envoyé",
    failSent: "Echec de l'envoi",
    already: "Candidature dejà envoyé",
    cancel: "Candidature annuler",
    failCancel: "Impossible d'annuler",
    rejet: "Candidature rejeter",
    failRejet: "Impossible de rejeter",
    rightOffre: "Interdit aux recruteurs",
    valid: "Offre publiée avec succes",
    validFail: "Echec de publication de l'offre",
    invalid: "Offre invalidée avec succes",
    invalidFail: "Echec de l'invalidation de l'offre",
    afiliate: "Affililié avec succes",
    afiliateFail: "Echec d'affiliation",
    invalidAffiliation: "Affiliation rejeter avec succès",
    invalidAffiliationFail: "Echec du rejet de l'afiliation",
    smsSend: "Message envoyé avec succès",
    smsFail: "Échec de l'envoi de votre message",
};

export const typeNotif = {
    succes: "succes",
    fail: "warning",
    danger: "danger",
};

export const actionsValues = {
    validOffre: "offres",
    validRecruteur: "recrueteurs",
    addEntreprise: "entreprises",
    addCommunes: "communes",
    addContrat: "contrats",
};

export const adminActions = [
    {
        title: "Valider une offre",
        value: actionsValues.validOffre,
    },
    {
        title: "Valider un recruteur",
        value: actionsValues.validRecruteur,
    },
    {
        title: "Ajouter une entreprise",
        value: actionsValues.addEntreprise,
    },
    {
        title: "Ajouter une commune",
        value: actionsValues.addCommunes,
    },
    {
        title: "Ajouter un type de contrat",
        value: actionsValues.addContrat,
    },
];
