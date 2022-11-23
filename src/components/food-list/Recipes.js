import React, {useState} from "react";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../database/database";

import {addNewActiveList, deleteFromFilteredList} from "../../reducers/productsReducer";
import {useDispatch} from "react-redux";

const Recipes = () => {
	const [recipeName, setRecipeName] = useState("");
	const dispatch = useDispatch();
	
	const addRecipe = async (id) => {
		const rec = await db.recipes.where('id').equals(id).toArray();
		dispatch(addNewActiveList(rec[0].components))
		rec[0].components.forEach(item => dispatch(deleteFromFilteredList(item.id)))
	}
	
	const list = useLiveQuery(
		async () => {
			const recipes = await db.recipes.toArray();
			if (!recipes) return null;
			return recipes.map(item => {
				return (
					<li
						className={"active-list-element"}
						key={item.id}>
						{item.name}
						<button
							className={"add-btn-round"}
							onClick={() => addRecipe(item.id)}>
							Выбрать
						</button>
					</li>
				)
			});
		}
	);
	
	return (
		<>
			<h2>Назвние рецепта: </h2>
			<div>
				<input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)}/>
				<div>
					{list}
				</div>
			</div>
		
		</>
	);
};

export default Recipes;
