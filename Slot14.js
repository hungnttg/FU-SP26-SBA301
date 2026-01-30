import React,{useState} from "react";
const UsersV1 = () =>{
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false);
    //ham doc du lieu V1
    const fetchUsersV1 = async () =>{
        setLoading(true);//trang thai loading duoc thiet lap
        try {
            const res = await fetch("http://localhost:8081/slot13/users",{
            headers: {"X-API-VERSION":"1"},
            });
            if(!res.ok) throw new Error("Network response was not ok");
            //chuyen sang json
            const data = await res.json();
            //cap nhat vao bien users
            setUsers(data);
        } catch (error) {
            console.error("Fetch error: ",error);
        }
        finally {
            setLoading(false);
        }
        
    };
    //giao dien
    return(
        <div>
            <h2>Read data with verson 1</h2>
            <button onClick={fetchUsersV1} disabled={loading}>
                {loading ? "Loading...": "Load Users"}
            </button>
            {users.length > 0 ? (
                <table border="1" cellPadding="5" style={{marginTop:"10px"}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p>No users loaded yet.</p>
            )}
        </div>
    );
}
export default UsersV1;