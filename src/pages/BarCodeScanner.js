import React, { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const [product,setProduct] = useState(null);
  const [price,setPrice] = useState(null);

  useEffect(()=>{
    
  },[]);
  // Hook to handle camera + 
  const handleBarCode = async ()=>{
    const productDetails = await fetch(`https://world.openfoodfacts.org/api/v0/product/${result}.json`).then((response)=>response.json()).then((data)=>{
      console.log(data.status_verbose);
      if(data.status_verbose === "product found"){
        setProduct(data);
        console.log(data);
        setTimeout(()=>{
          setResult("");
          setProduct(null);
        },10000)
      }else{
        alert('Not Found');
      }
      
    })
    

  }
  const handleprice =  async () =>{
    const productPrice = await fetch(`/api/${result}`).then((response)=>response.json()).then((data)=>{
      setPrice(data);
      console.log(data);
    })
  }
  
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText()); // Extract barcode text
    },
  });

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">📷 Barcode Scanner</h2>
      <video ref={ref} className="w-70 max-w-sm rounded-lg border" />
      <h3>Enter Bar Code Instead of Scan</h3>
      <p><input type='text' onChange={(e)=>setResult(e.target.value)}/></p>
      
      {result && (
        <div className="mt-4 p-2 bg-green-100 border rounded">
          ✅ Barcode Detected: <b>{result}</b>
          <button className="" onClick={handleBarCode}>Get Info</button>
          <button className="" onClick={handleprice}>Get price</button>
          <div>
        <h1 className="tex">Product Details:</h1>
        <p>Product Name : {product?.product.generic_name}</p>
        <p>Sugar per 100g : {product?.product.nutriments.sugars}</p>
        <p>Product Price: {price?.result}</p>
      </div>
        </div>
      )}
      
    </div>
  );
};

export default BarcodeScanner;
