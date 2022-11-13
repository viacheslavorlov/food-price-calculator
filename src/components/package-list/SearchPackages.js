import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ErrorBoundary from "../error-boundaries/ErrorBoundaries";
import {useSelector} from "react-redux";
import {
	addToActiveList,
	filterPackages,
	deleteFromFilteredList
} from "../../reducers/packageReducer";

const SearchPackages = () => {
	const [filter, setFilter] = useState("");
	const dispatch = useDispatch();
	const {packages, filteredPackages, activePackage} = useSelector(state => state.package);
	
	const filterFunction = (str) => {
		if (str.trim()) {
			dispatch(filterPackages(str));
		}
	};
	useEffect(() => {
		filterFunction(filter);
	}, [filter, packages]);
	
	
	// const deleteItemFromList = (id) => {
	// 	dispatch(deleteFromFilteredList(id))
	// };
	
	
	const list = filteredPackages
		.filter(item => !activePackage.includes(item))
		.map((el, i) => {
		return (
			<div key={i}>
				{el.name.toUpperCase()}
				<button onClick={() => {
					dispatch(addToActiveList(el.id));
					dispatch(deleteFromFilteredList(el.id));
					setFilter('');
				}}
				>Добавить
				</button>
			</div>);
	});
	const content = list || <h1>нет выбранных продуктов</h1>;
	
	useEffect(() => {
		dispatch(filterPackages(filter));
	}, [filter]);
	
	
	return (<div>
		<input type="search" placeholder="Название продукта" value={filter}
		       onChange={(e) => setFilter(e.target.value)}/>
		<ErrorBoundary>
			{content}
		</ErrorBoundary>
	</div>);
};

export default SearchPackages;