import React, {useState} from "react";
import {db} from "../../database/database";
import {useSelector} from "react-redux";
import {useLiveQuery} from "dexie-react-hooks";

const AddRecipes = () => {
	const [recipe, setRecipe] = useState("");
	const {activeProducts} = useSelector((state) => state.products);
	
	// список рецептов
	let listOfRecipes = useLiveQuery(
		() => db.recipes.toArray());
	// console.log("listOfRecipes", listOfRecipes);
	if (!listOfRecipes) {
		listOfRecipes = [];
	}
	
	const listOfRecipesNames = listOfRecipes.length !== 0 ?
		listOfRecipes.map(item => item.name) : [];
	// console.log("listOfRecipesNames", listOfRecipesNames);
	
	// сохранение рецепта
	const saveRecipes = () => {
		if (listOfRecipesNames && listOfRecipesNames.includes(recipe.toLowerCase())) {
			alert("Такой рецепт уже существует!");
			return;
		}
		if (recipe.trim()) {
			db.recipes.add({
				name: recipe,
				date: new Date().toLocaleDateString(),
				components: activeProducts
			});
			alert("Рецепт добавлен");
		} else {
			alert("Нужно ввести название рецепта");
		}
		
		
	};
	return (
		<div>
			<h2>Сохранить рецепт:</h2>
			<input
				type="text"
				value={recipe}
				placeholder="Введите название рецепта"
				onChange={(e) => setRecipe(e.target.value)}/>
			<button
				className="add__button"
				onClick={() => {
					saveRecipes(activeProducts);
					
					setRecipe("");
				}}>Сохранить стоимость рецепта
			</button>
		</div>
	);
};

export default AddRecipes;
