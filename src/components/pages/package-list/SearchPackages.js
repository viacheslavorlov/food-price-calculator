import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {filterPackages} from "../../../reducers/packageReducer";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../../database/database";


const SearchPackages = ({buttonName, type, deleteOrAdd}) => {
	const [filter, setFilter] = useState("");
	const dispatch = useDispatch();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const recipes = useLiveQuery(() => {
		return db.recipes.toArray()
	})
	const {products} = useSelector(state => state.products)
	const {packages} = useSelector(state => state.package)
	let items, activeItems;
	let filterFunc, finalFunc, className;
	if (type === "recipes") {
		items = recipes;
		if (deleteOrAdd === "delete") {
			className = "delete__button"
			finalFunc = (id) => {
				db.recipes.delete(id)
			}
		}
	}
	
	if (type === "packages") {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		items = useSelector(state => state.package.packages);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		activeItems = useSelector(state => state.package.activePackage);
	}
	if (type === "products") {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		items = useSelector(state => state.products.products);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		activeItems = useSelector(state => state.products.activeProducts);
	}
	
	if (deleteOrAdd === "delete") {
		className = "delete__button";
		if (type === "packages") {
			import("../../../reducers/packageReducer")
				.then(module => {
					finalFunc = (id) => dispatch(module.deleteFromPackages(id));
					filterFunc = (id) => dispatch(module.filterPackages(id));
				});
			
		} else if (type === "products") {
			import("../../../reducers/productsReducer")
				.then(module => {
					finalFunc = (id) => dispatch(module.deleteFromProducts(id));
					filterFunc = (id) => dispatch(module.filterProducts(id));
				});
		}
	} else if (deleteOrAdd === "add") {
		className = "add_button";
		if (type === "packages") {
			import("../../../reducers/packageReducer")
				.then(module => {
					finalFunc = (id) => dispatch(module.addToActiveList(id));
					filterFunc = (id) => dispatch(module.filterPackages(id));
				});
		} else if (type === "products") {
			import("../../../reducers/productsReducer")
				.then(module => {
					finalFunc = (id) => dispatch(module.addToActiveList(id));
					filterFunc = (id) => dispatch(module.filterProducts(id));
				});
		}
	}
	
	
	// const filterFunction = (str) => {
	// 	if (str.trim()) {
	// 		dispatch(filterFunc(str));
	// 	}
	// };
	// useEffect(() => {
	// 	filterFunction(filter);
	// }, [filter, items, packages]);
	
	const ButtonTyped = ({func, elem}) => {
		return (
			<button
				onClick={() => {
					func(elem.id);
					setFilter("");
				}}
				className={className}
			>{buttonName}
			</button>
		);
	};
	
	
	const list = items
			.filter(item => !activeItems.includes(item))
			.map((el, i) => {
				return (
					<div className={"delete__list__item"} key={i}>
						{el.name.toUpperCase()}
						<ButtonTyped
							className={""}
							func={() => finalFunc(el.id)}
							elem={el}/>
					</div>);
			});
	
	const content = list || <h1>нет выбранных продуктов</h1>;
	
	useEffect(() => {
		dispatch(filterPackages(''))
	}, []);
	
	
	return (<div>
		<input type="search" placeholder="Название продукта" value={filter}
		       onChange={(e) => setFilter(e.target.value)}/>
		{content}
	</div>);
};

export default SearchPackages;