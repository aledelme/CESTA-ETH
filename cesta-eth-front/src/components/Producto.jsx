import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Context } from "../main";

export function Producto(){
    const params = useParams()

    const toast = useRef(null)
    const [toastText, setToastText] = useState('')

    const [cesta, setCesta] = useContext(Context)
    const cantidad = cesta.find(i => i.producto.product_id == params.id)?.cantidad || 1
    const {register, handleSubmit} = useForm({
        defaultValues: {cantidad: cantidad}
    })

    const {data, isLoading} = useQuery("product", () => {
        return fetch(`http://localhost:3000/products/${params.id}`)
            .then(res => res.json())
    })

    function onSubmit(datos){
        const producto = {
            producto: data,
            cantidad: datos.cantidad,
            total: datos.cantidad * data.unit_price
        }
        const newCesta = cesta
            .filter(i => i.producto.product_id != data.product_id)
            .concat([producto])
        setCesta(newCesta)

        
        setToastText(`Se han añadido ${datos.cantidad} ${data.product_name} al carrito`)
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast.current)
        toastBootstrap.show()
    }


    if (isLoading)
        return <div>Cargando...</div>

    return <div>
        <h3>Producto</h3>
        <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <td>{data.product_id}</td>
                </tr>
                <tr>
                    <th>Nombre</th>
                    <td>{data.product_name}</td>
                </tr>
                <tr>
                    <th>Precio</th>
                    <td>{data.unit_price} CC</td>
                </tr>
            </thead>
        </table>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Introduzca la cantidad</label>
                <input {...register('cantidad')} type="number" required min={1} className="form-control" />
            </div>
            <button className="btn btn-primary mt-3">Añadir al carrito</button>
        </form>

        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div ref={toast} id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-body">
                    {toastText}
                </div>
            </div>
        </div>
    </div>
}