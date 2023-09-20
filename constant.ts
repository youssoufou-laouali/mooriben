export const url_api = "https://mooribennest.vercel.app"
//  export const url_api = "http://localhost:8080"
export const tags = [
    { name: "FORMATION" },
    { name: "ATELIER" }, 
    { name: "RAPPORT_SEMESTRIEL" },
    { name: "RAPPOR_ANNUEL" },
    { name: "ACTIVITE" },
    { name: "AGROECOLOGIE" },
    { name: "PROJET" }
].sort((a, b) => b.name > a.name ? -1 : 1)

export interface ArticleInterface {
    categories: string[];
    createdAt: Date;
    updatedAt: Date;
    description: string;
    id: string;
    image: string;
    name: string;
  }