import { mountConstructionSite } from "./construction_site";
import { mountCreep } from "./creep";
import { mountSource } from "./source";
import { mountStructure } from "./structure";

export const mountAll = () => {
	mountSource();
	mountStructure();
	mountCreep();
	mountConstructionSite();
}