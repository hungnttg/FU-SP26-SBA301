import { useState,useEffect } from "react";
export default function Slot10(){
    const [user,setUser]=useState(null);
    const [name,setName]=useState("");
    const [birthday,setBirthday]=useState("");
    //lay du lieu tu spring boot
    const fetchUser = async () =>{
        try {
            const res = await fetch("http://localhost:8080/user");//doc du lieu tu server
            const data = await res.json();//chuyen sang json
            setUser(data);//set bao bien
        } catch (error) {
            console.error("Error fetching user: ",error);
        }
    };
    useEffect(()=>{
        fetchUser();
    },[]);
    //guu user moi len Spring boot
    const createUser = async () => {
        if(!name || !birthday){
            alert("Please fill in all fields");
            return;
        }
        try {
            const res = await fetch("http://localhost:8080/user",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({name,birthday}),
            });
            const text = await res.text();
            alert(text);
            setName("");
            setBirthday("");
            fetchUser();//cap nhat user
        } catch (error) {
            console.log("Error creating user",error);
        }
        
    };
    //viet giao dien
    return(
        <div style={{padding:"20px"}}>
            <h1>BVi du ve Jackson</h1>
            <div style={{marginBottom:"20px"}}>
                <h2>Current User</h2>
                {!user ? (
                    <p>Loading....</p>
                ) :(
                    <div>
                        <p><strong>Name: </strong>{user.name}</p>
                        <p><strong>Birthday: </strong>{user.birthday}</p>
                    </div>
                )}
            </div>
            <div>
                <h2>Create new user</h2>
                <input
                    placeholder="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                /><br/>
                <input
                    placeholder="birthday"
                    value={birthday}
                    onChange={(e)=>setBirthday(e.target.value)}
                /><br/>
                <button onClick={createUser}>Create User</button>
            </div>
        </div>
    );
}