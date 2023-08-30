import { useContext, useEffect, useState } from "react"
import { Context } from "../main"
import { Link } from "react-router-dom"
import { ethers, toBeHex } from "ethers"

export function Cesta(){
    const [cesta, setCesta] = useContext(Context)
    const [cuenta, setCuenta] = useState(null)
    const [balance, setBalance] = useState(null)
    const [txOK, setTxOK] = useState(null)
    const [txKO, setTxKO] = useState(null)

    const total = cesta.reduce((a,c) => a + c.total, 0)

    useEffect(()=>{
        window.ethereum && window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then(cuentas => {
            setCuenta(cuentas[0])
            ethereum.on("accountsChanged", (cuentas) => {
                setCuenta(cuentas[0])
            })
        })
    }, [])
    useEffect(() => {
        if(cuenta){
            const provider = new ethers.BrowserProvider(ethereum)
            provider.getBalance(cuenta).then(balance =>  {
                setBalance(ethers.formatEther(balance))
            })
        }
    },[cuenta])

    async function pagar(){
        const txParams = {
            from: cuenta,
            to: "0x4b90487F4e9487762CcA44f46F2ba91b3ba6aa13",
            value: toBeHex(ethers.parseEther(total.toString()))
        }
        try {
            console.log("intento pagar")
            const tx = await ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams]
            })
            setTxOK(tx)
            setCesta([])
        } catch (error) {
            setTxKO(error)
        }
    }

    return <div>
        <h3>Cesta</h3>
        <table className="table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Sub total</th>
                </tr>
            </thead>
            <tbody>
                {cesta.map(p => {
                    return <tr key={p.producto.product_id}>
                        <td><Link to={`/productos/${p.producto.product_id}`}>{p.producto.product_name}</Link></td>
                        <td>{p.producto.unit_price} CC</td>
                        <td>{p.cantidad}</td>
                        <td>{p.total} CC</td>
                    </tr>
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td><b>TOTAL:</b></td>
                    <td>{total} CC</td>
                </tr>
            </tfoot>
        </table>
        <h4>Cuenta: {cuenta}</h4>
        <h4>Balance: {balance} CC</h4>
        <button onClick={() => pagar()} className="btn btn-primary my-3">Pagar</button>
        {txOK && <p className="alert alert-success">{txOK}</p>}
        {txKO && <p className="alert alert-danger">{txKO}</p>}
    </div>
}