import { useState,useEffect } from "react";
export default function Slot15(){
    const [users,setUsers]=useState([]);
    const [name,setName]=useState("");
    const [birthday,setBirthday]=useState("");
    const [editingId,setEditingId]=useState(null);
    const API = "http://localhost:8081/slot15user";
    //lay tat ca nguoi dung
    const fetchUsers = async () =>{
        try {
            const res = await fetch(API);
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users: ",error);
        }
    };
    //goi ham
    useEffect(()=>{
        fetchUsers();
    },[]);
    //ham them, sua
    const saveUser = async () =>{
        //kiem tra nguoi dung co nhap lieu khong
        if(!name || !birthday){alert("Name and birthday required"); return;}
        try {
            if(editingId){//neu ton tai ID => sua
                await fetch(`${API}/${editingId}`,{
                    method:"PUT",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({name,birthday}),
                });
            }
            else {//neu khong ton tai ID => them
                await fetch(API,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({name,birthday}),
                });
            }
            setName(""); setBirthday(""); setEditingId(null);//xoa trang
            fetchUsers(); //reload
        } catch (error) {
            console.error("Error saveing user: ",error);
        }
    };
    //load du lieu chinh sua
    const editUser = (u) =>{
        setName(u.name);
        setBirthday(u.birthday);
        setEditingId(u.id);
    };
    //xoa
    const deleteUser = async (id) =>{
        if(!window.confirm("Delete?")) return;
        await fetch(`${API}/${id}`,{method:"DELETE"});//xoa
        fetchUsers();//reload
    };
    //giao dien
    return(
        <div style={{padding:"20px",maxWidth:"600px",margin:"auto"}}>
            <h2>{editingId ? "Edit" : "Add"}</h2>
            <input
                type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}
                style={{width:"100%",marginBottom:"10px"}}
            />
            <input
                type="date" placeholder="Date" value={birthday} onChange={e=>setBirthday(e.target.value)}
                style={{width:"100%",marginBottom:"10px"}}
            />
            <button onClick={saveUser}
            style={{width:"100%",marginBottom:"20px"}}>{editingId? "Update": "Add"}</button>
            {/* damj sacj user */}
            <h2>Danh sach nguoi dung</h2>
            <table border="1" cellPadding="5" style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u=>(
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.birthday}</td>
                            <td>
                                <button onClick={()=>editUser(u)}>Edit</button>{" "}
                                <button onClick={()=>deleteUser(u.id)}>Delete</button>{" "}
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && 
                    <tr>
                        <td colSpan="4" style={{textAlign:"center"}}>No Users</td>
                    </tr>}
                </tbody>
            </table>
        </div>
    );

}