import { useQuery } from "react-query";
import { Link } from 'react-router-dom'

export function Productos(){
    const {data, isLoading, isError} = useQuery("products", () => {
        return fetch("http://localhost:3000/products")
            .then(res => res.json())
    })

    if (isLoading)
        return <div>Cargando...</div>

    if (isError)
        return <h3>:/ Vaya, no hemos podido encontrar los productos...</h3>

    return <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Proveedor</th>
                <th>Categoria</th>
                <th>Cantidad por unidad</th>
                <th>Precio</th>
                <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            {data.map(d => {
                return <tr key={d.product_id}>
                    <td><Link to={`/productos/${d.product_id}`}>{d.product_name}</Link></td>
                    <td>{d.company_name}</td>
                    <td>{d.category_name}</td>
                    <td>{d.quantity_per_unit}</td>
                    <td>{d.unit_price} CC</td>
                    <td>{d.units_in_stock}</td>
                </tr>
            })}
        </tbody>
    </table>
}