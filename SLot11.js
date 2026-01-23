import { useState,useEffect } from "react";
export default function Slot11(){
    const [users,setUsers]=useState([]);
    const [name,setName]=useState("");
    const [birthday,setBirthday]=useState("");
    const [editingId,setEditingId]=useState(null);

    const API = "http://localhost:8081/slot11user";
    //fetch all users
    const fetchUsers = async () =>{
        try {
            const res = await fetch(API);//doc du lieu tu server
            const data = await res.json();//chuyen sang json
            setUsers(data);//cap nhat vao bien
        } catch (error) {
            console.error("Error fetching user: ",error);
        }
    };
    useEffect(()=>{
        fetchUsers();
    },[]);
    //add or update user
    const saveUser = async () =>{
        if(!name || !birthday){
            alert("name and birthday required");
            return;
        }
        try {
            if(editingId){
                //update
                await(fetch(`${API}/${editingId}`,{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({name,birthday}),
                }))
            }
            else {
                //creating
                await fetch(API,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({name,birthday})
                });
            }
            setName("");//xoa trang
            setBirthday("");
            setEditingId(null);
            fetchUsers();//reload data
        } catch (error) {
            console.error("Error saving users",error);
        }
    }
        //editing
        const editUser = (user) =>{
            setName(user.name);
            setBirthday(user.birthday);
            setEditingId(user.id);
        };
        //delete
        const deleteUser = async (id) =>{
            if(!window.confirm("Are you sure to delete?")) return;
            try {
                await fetch(`${API}/${id}`,{ method: "DELETE"});
                fetchUsers();//reload
            } catch (error) {
                console.error("Error deleting user: ",error);
            }
        };
        //layout
        return(
            <div style={{padding:"20px",maxWidth: "600px",margin:"auto"}}>
                <h2>{editingId ? "Edit Slot11User" : "Add Slot11User"}</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    style={{width:"100%",marginBottom:"10px"}}
                />
                <input
                    type="date"
                    placeholder="Birthday"
                    value={birthday}
                    onChange={(e)=>setBirthday(e.target.value)}
                    style={{width:"100%",marginBottom:"10px"}}
                />
                <button onClick={saveUser} style={{width:"100%",marginBottom:"20px"}}>
                    {editingId ? "Update" : "Add"}
                </button>
                <h2>Slot11User List</h2>
                <table border="1" cellPadding="5" style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Birthday</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                        <tbody>
                            {users.map((u)=>(
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.birthday}</td>
                                    <td>
                                        <button onClick={()=>editUser(u)}>Edit</button>{" "}
                                        <button onClick={()=>deleteUser(u.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{textAlign:"center"}}>
                                        No users
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    
                </table>
            </div>
        );

    };
