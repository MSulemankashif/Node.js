import { useEffect, useState } from 'react'
import './App.css'

function App() {

  async function getproducts(){
    try {
      setLoading(true)
      setError("")
      var response =  await fetch("http://localhost:3000/products/")
      if (!response.ok) {
        console.error("error while fetching")
        setError("error while fetching")
      }
      else{
        var data = await response.json()
        setProductList(data)
      }
    } catch (error) {
      setError(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(
    ()=>{
      getproducts()
    },
    []
  )


  var [productList, setProductList] = useState([])
  var [loading, setLoading] = useState(false)
  var [error, setError] = useState(null)

  return (
    <>
    <div>
      <h2>All products</h2>

      { loading && <p>Loading products...</p>  }
      { error && <p style={{color: "red"}}>{error}</p> }

      { productList.map(  (product, index)=>{

        return (
          <div>
          <p> {product.title} {index} </p>
        </div>
        )

      }) }

    </div>
    </>
  )
}

export default App
