import React, {useState} from "react";
import "./DeleteItems.css";
import SearchPackages from "../pages/package-list/SearchPackages";


const DeleteItems = () => {
	const [type, setType] = useState("products");
	
	return (
		<div className={"delete__items"}>
			<h2>Что удаляем?</h2>
			<div className={"delete__form"}>
				<div>Продукты или упаковка:</div>
				<label>Продукты:
					<input type="radio"
					       value={"products"}
					       className="delete__form__radio"
					       name="type"
					       onChange={(e) => setType(e.target.value)}/>
				</label>
				<label>
					Упаковка:
					<input type="radio"
					       value={"packages"}
					       className="delete__form__radio"
					       name="type"
					       onChange={(e) => setType(e.target.value)}/>
				</label>
				{/*<label>*/}
				{/*	Рецепты:*/}
				{/*	<input type="radio"*/}
				{/*	       value={"recipes"}*/}
				{/*	       className="delete__form__radio"*/}
				{/*	       name="type"*/}
				{/*	       onChange={(e) => setType(e.target.value)}/>*/}
				{/*</label>*/}
				
				<SearchPackages type={type}
				                deleteOrAdd={"delete"}
				                buttonName={"Удалить"}/>
			
			</div>
		</div>
	);
};

export default DeleteItems;
