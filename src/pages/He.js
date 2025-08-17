import React, { useState } from "react";
import { useZxing } from "react-zxing";

const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const [product,setProduct] = useState(null);

  // Hook to handle camera + 
  const handleBarCode = async ()=>{
    const productDetails = await fetch(`https://world.openfoodfacts.org/api/v0/product/${result}.json`).then((response)=>response.json()).then((data)=>{
      console.log(data);
      setProduct(data);
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
      <video ref={ref} className="w-full max-w-md rounded-lg border" />
      
      {result && (
        <div className="mt-4 p-2 bg-green-100 border rounded">
          ✅ Barcode Detected: <b>{result}</b>
          <button onClick={handleBarCode}>Click Me</button>
        </div>
      )}
      <div>
        
        <h1 className="tex">Product Details:</h1>
        <p>Product Name : {product.product.generic_name}</p>
      </div>
    </div>
  );
};

export default BarcodeScanner;
