import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ErrorBoundary from "../../error-boundaries/ErrorBoundaries";
import {useSelector} from "react-redux";


const SearchPackages = ({buttonName, type, deleteOrAdd}) => {
	const [filter, setFilter] = useState("");
	const dispatch = useDispatch();
	let items, filteredItems, activeItems;
	
	if (type === "packages") {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		items = useSelector(state => state.package.packages);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		filteredItems = useSelector(state => state.package.filteredPackages);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		activeItems = useSelector(state => state.package.activePackage);
	}
	if (type === "products") {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		items = useSelector(state => state.products.products);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		filteredItems = useSelector(state => state.products.filteredProducts);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		activeItems = useSelector(state => state.products.activeProducts);
	}
	let filterFunc;
	let finalFunc;
	if (deleteOrAdd === "delete") {
		if (type === "packages") {
			import("../../../reducers/packageReducer")
				.then(module => {
					finalFunc = module.deleteFromPackages;
					filterFunc = module.filterPackages;
				});
			
		} else if (type === "products") {
			import("../../../reducers/productsReducer")
				.then(module => {
					finalFunc = module.deleteFromProducts;
					filterFunc = module.filterProducts;
				});
		}
	} else if (deleteOrAdd === "add") {
		if (type === "packages") {
			import("../../../reducers/packageReducer")
				.then(module => {
					finalFunc = module.addToActiveList;
					filterFunc = module.filterPackages;
				});
		} else if (type === "products") {
			import("../../../reducers/productsReducer")
				.then(module => {
					finalFunc = module.addToActiveList
					filterFunc = module.filterProducts;
				});
		}
	}
	
	
	const filterFunction = (str) => {
		if (str.trim()) {
			dispatch(filterFunc(str));
		}
	};
	useEffect(() => {
		filterFunction(filter);
	}, [filter, items]);
	
	const ButtonTyped = ({func, elem}) => {
		return (
			<button onClick={() => {
				func(elem.id);
				setFilter("");
			}}
			>{buttonName}
			</button>
		);
	};
	
	
	const list = filteredItems
		.filter(item => !activeItems.includes(item))
		.map((el, i) => {
			return (
				<div key={i}>
					{el.name.toUpperCase()}
					<ButtonTyped
						func={() => dispatch(finalFunc(el.id))}
						elem={el}/>
				</div>);
		});
	const content = list || <h1>нет выбранных продуктов</h1>;
	
	useEffect(() => {
		filterFunction(filter);
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