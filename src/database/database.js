import Dexie from "dexie";

export const db = new Dexie('FoodPriceCalculator');
db.version(2).stores({
	recipes: '++id, name, components, date' // Primary key and indexed props
});