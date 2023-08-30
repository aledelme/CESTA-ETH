const express = require("express")
const cors = require("cors")
const query = require("./db")


const app = express()
app.use(cors())

app.listen(3000, () => {
    console.log(`Listening at port 3000`)
})


app.get("/products", async (req, res) => {
    try {
        const products = await query(`
            select
                p.product_id ,
                p.product_name ,
                s.company_name ,
                c.category_name ,
                p.quantity_per_unit ,
                p.unit_price ,
                p.units_in_stock 
            from products p 
            inner join suppliers s on s.supplier_id = p.supplier_id 
            inner join categories c on c.category_id = p.category_id 
        `)
        res.send(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params
    try {
        const products = await query(`            
        select
            p.product_id ,
            p.product_name ,
            s.company_name ,
            c.category_name ,
            p.quantity_per_unit ,
            p.unit_price ,
            p.units_in_stock 
        from products p 
        inner join suppliers s on s.supplier_id = p.supplier_id 
        inner join categories c on c.category_id = p.category_id WHERE product_id = $1`, [id])
        res.send(products[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
})

