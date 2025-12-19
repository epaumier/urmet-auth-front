export const userInfo = {
  contractType: "particulier" as "particulier" | "pro",
};

export const FeedData = [
  {
    content:
      "ALL'ZEN : un service de location d'écran pour votre hall pour diffuser de l'information",
    date: "05/06/2025",
    linkToArticle: "/path/to/article",
    id: 0,
  },
  {
    content:
      "URMET FID : notre programme de fidélité dédié aux installateurs de kits villas",
    date: "26/05/2025",
    linkToArticle: "/path/to/article",
    id: 1,
  },
  {
    content:
      "Urmet Assist : pour trouver rapidement un installateur partenaire",
    date: "22/05/2025",
    linkToArticle: "/path/to/article",
    id: 2,
  },
];

// Quote Data
export const QuoteData = [
  "Simuler votre projet en autonomie",
  "Être accompagné par un commercial",
];

// Orders Data
export const OrdersHeadings = [
  "Ref. Produit",
  "Produit ou service",
  "N° de commande",
  "Montant",
  "Statut",
  "Bons de retour",
  "Date d'achat",
];

export const OrdersData = [
  {
    ref: "5688/323",
    product: "Demande d'enlèvement d'un colis",
    order: "56234512",
    amount: "Premium",
    status: "En attente de conf.",
    bonsDeRetour: "Aucune",
    date: "Le 22/07/2025",
  },
  {
    ref: "84589654",
    product: "Gravure sur badge",
    order: "25456249",
    amount: "Premium",
    status: "Expédiée",
    bonsDeRetour: "Aucun",
    date: "Le 18/06/2025",
  },
  {
    ref: "1099/500",
    product: "Camera IP compacte 5M 2,8",
    order: "63524198",
    amount: "62,00 € HT",
    status: "Expédiée",
    bonsDeRetour: "Aucun",
    date: "Le 07/04/2025",
  },
  {
    ref: "9505/647",
    product: "Plaque à défilement DAWL/I3",
    order: "14758495",
    amount: "1025,00 € HT",
    status: "Expédiée",
    bonsDeRetour: "n°14758495",
    date: "Le 18/09/2023",
    extra: "Télécharger le contrat",
  },
];

// SAV Data
export const SAVHeadings = [
  "Ref. Produit",
  "Produit ou service",
  "N° du bon",
  "Statut",
  "Ref chantier",
  "Date de création",
];

export const SAVData = [
  {
    ref: "3456/789",
    product: "Camera IP compacte 5M 2.8px modele numero 394833940",
    order: "34567890",
    status: "En attente de réception",
    bonsDeRetour: "n°34567890",
    date: "Le 03/10/2025",
  },
  {
    ref: "1234/567",
    product: "Plaque à défilement DAWL/I3",
    order: "12345678",
    status: "Reçu",
    bonsDeRetour: "n°12345678",
    date: "Le 20/09/2025",
  },
];

// Tabs Data
export const OrdersTabData = ["Commandes en ligne", "Retour SAV"];

export const AccountTabData = [
  "Informations générales",
  "Connexion et sécurité",
  "Newsletter",
];

// Account Data
export type AccountField = {
  label: string;
  value: string | string[];
};

export type AccountSection = {
  title: string;
  fields: AccountField[];
};

export const AccountData: AccountSection[] = [
  {
    title: "Informations personnelles",
    fields: [
      { label: "Civilité", value: "Mme" },
      { label: "Nom et prénom", value: "DELARUE Claudine" },
      { label: "Société", value: "Entreprise DELARUE" },
    ],
  },
  {
    title: "Facturations et expéditions",
    fields: [
      {
        label: "Adresse de facturation",
        value: ["20 rue ramier", "75001 Paris", "France"],
      },
      {
        label: "",
        value: "Adresse de livraison similaire à l'adresse de facturation",
      },
    ],
  },
  {
    title: "Moyen de paiement",
    fields: [
      { label: "Mode de paiement", value: "Prélèvement mensuel" },
      { label: "Banque", value: "LCL" },
      { label: "IBAN", value: "FR**** **** **** **** **75G649 **" },
    ],
  },
];
