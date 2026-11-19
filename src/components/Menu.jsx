import { NavLink } from "react-router";

const Menu = () => {
    return ( 
        <header className = "bg-slate-800 text-blue p-4">
            <h1 className = "text-4xl font-semibold text-white mb-5">Tetos</h1>
            <nav className = "flex flex-col *:leading-10 *:font-semibold *:text-white *:hover:bg-white/25! *:rounded *:duration-200! *:pl-4 *:[&.active]:bg-white/25! *:[&.active]:text-blue-500!">
                <NavLink end to="/painel">Home</NavLink>
                <NavLink end to="/painel/niveis">Níveis</NavLink>
                <NavLink end to="/painel/imoveis-tipo">Imóveis tipo</NavLink>
                <NavLink end to="/painel/locatarios">Locatários</NavLink>
            </nav>
        </header>
     );
}
 
export default Menu;