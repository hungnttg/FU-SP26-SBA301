import React,{useState,useEffect} from "react";
export default function Slot8_1(){
    const [products, setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const fetchProducts = () =>{
        fetch("http://localhost:8080/api/products")
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        }).catch(console.error);
    };
    useEffect(()=>{
        fetchProducts();
    },[]);
    const deleteProduct = (id) =>{
        fetch(`http://localhost:8080/api/products/${id}`,{method:"DELETE"})
        .then(()=> fetchProducts())
        .catch(console.error);
    };
    if(loading) return <div>Dang load du lieu...</div>;
    //giao dien
    return(
        <div style={{padding:30}}>
            <h1>List san pham</h1>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {products.map(p=>(
                    <div key={p.id} style={{
                        width:250,border:"1px solid #ddd", borderRadius:10,
                        padding:15, margin:10
                    }}>
                        <img src={p.hinhanhsanpham} style={{width:"100%",height:150, objectFit:"cover"}}/>
                        <h3>{p.tensanpham}</h3>
                        <p>Gia: {p.giasanpham} VND</p>
                        <p>{p.motasanpham && p.motasanpham.slice(0,80)}...</p>
                        <button onClick={()=>deleteProduct(p.id)} style={{background:"red",color:"white"}}>
                            Xoa
                        </button>
                    </div>

                ))}
            </div>
        </div>
    );

}