import "./Header.css";
import {NavLink} from "react-router-dom";

import React from 'react';

const Header = () => {
    return (
        <div className={"header"}>
            <h3 className={"header__name"}>Калькулятор себестоимости вкусняшек</h3>
            <nav className="header__navbar">
                <NavLink className="header__navbar_link" to="new-item">Добавить новый продукт</NavLink>
                <NavLink className="header__navbar_link" to="/">Список продуктов</NavLink>
                <NavLink className="header__navbar_link" to="package">Список упаковок</NavLink>
            </nav>
        </div>
    );
};

export default Header;