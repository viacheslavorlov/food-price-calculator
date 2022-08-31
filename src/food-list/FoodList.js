import React from 'react';

const FoodList = (props) => {
    return (
        <div className="product_list">
            <h2 className="product_list__heading">Список продуктов</h2>
            <ul className="product_list__elements">
                <li className="product_list__element">Мука пшеничная
                    <div>количество <select id="Мука пшеничная"></select></div>
                </li>
                <li>Яйцо</li>
                <li>Молоко</li>
                <li>Сливки</li>
                <li>Сахак</li>
            </ul>
        </div>
    );
};

export default FoodList;