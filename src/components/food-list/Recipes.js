import React, {useEffect, useState} from "react";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../database/database";
import {addNewActiveList, deleteFromFilteredList} from "../../reducers/productsReducer";
import {useDispatch} from "react-redux";
import {finalPrice} from "../../services/utils";

const Recipes = () => {
	const [recipeName, setRecipeName] = useState("");
	const dispatch = useDispatch();
	
	const regex = new RegExp(recipeName, 'i')
	
	const addRecipe = async (id) => {
		const rec = await db.recipes.where("id").equals(id).toArray();
		dispatch(addNewActiveList(rec[0].components));
		rec[0].components.forEach(item => dispatch(deleteFromFilteredList(item.id)));
	};
	
	const list = useLiveQuery(
		async () => {
			return await db.recipes.toArray();
		});
	const listFormation = (arr) => {
		if (!arr || arr.length === 0) return null;
		return arr.filter(el => regex.test(el.name))
			.map(item => {
				return (
					<li
						className={"active-list-element"}
						key={item.id}>
						<b><u>{item.name.toUpperCase()}:</u> {`Цена: ${finalPrice(item.components).toFixed(2)}`}
							<span className={"span"}>_</span>
						{`Цена + свет: ${(finalPrice(item.components)* 1.1).toFixed(2)}`}
						</b>
						
						<button
							className={"add-btn-round"}
							onClick={() => addRecipe(item.id)}>
							Выбрать
						</button>
					</li>
				);
			});
	};
	
	useEffect(() => {
		listFormation(list);
	});
	
	return (
		<>
			<h2>Назвние рецепта: </h2>
			<div>
				<input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)}/>
				<div>
					{listFormation(list)}
				</div>
			</div>
		
		</>
	);
};

export default Recipes;
