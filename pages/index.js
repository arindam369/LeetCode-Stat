import axios from "axios";
import { useEffect, useState } from "react";
import UserDetails from "@/components/UserDetails";
import styles from "../styles/Home.module.css";
import { notification } from "antd";

export default function HomePage(){
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const fetchedUsers = JSON.parse(localStorage.getItem("lc_users")) || [];
    setUsers(fetchedUsers);
  }, [])


  const searchUser = ()=>{
    if(userId.trim().length === 0) return;

    axios.get(`${process.env.NEXT_PUBLIC_LEETCODE_API_URL}/${userId}`).then((response)=>{
      if(response.data.status === "success"){
        const lcUsers = JSON.parse(localStorage.getItem("lc_users")) || [];
        if(lcUsers.length===0 || !lcUsers.includes(userId)){
          lcUsers.push(userId);
          localStorage.setItem("lc_users", JSON.stringify(lcUsers));
          setUsers(lcUsers);
          notification['success']({
            message: `New Friend added`,
            duration: 2
          })
        }
        else{
          notification['success']({
            message: `Account is already added`,
            duration: 2
          })
        }
      }
      else{
        notification['error']({
          message: `No Leetcode Account Found`,
          duration: 2
        })
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  const handleDelete = (id)=>{
    const lcUsers = JSON.parse(localStorage.getItem("lc_users")) || [];
    if(lcUsers.length>0){
      const index = lcUsers.indexOf(id);
      if(index>-1){
        lcUsers.splice(index, 1);
      }
      localStorage.setItem("lc_users", JSON.stringify(lcUsers));
      notification['success']({
        message: `Friend removed successfully`,
        duration: 2
      })
      setUsers(lcUsers);
    }
  }

  return (
    <>
      <div>
        <h2>LeetCode Stat</h2>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Enter Leetcode ID" value={userId} onChange={(e)=>{setUserId(e.target.value)}}/>
          <button onClick={searchUser}>Search</button>
        </div>
      </div>

      <div>
        <h2>Your Leetcode Friends</h2>
        <div className={styles.userDetailsContainer}>
          {users && users.length===0 && <h2 className={styles.noFriends}>You have no Friends</h2>}
          {users && users.length>0 && users.map((userId, key)=>{
            return <UserDetails key={key} id={userId} onDelete={(id)=>handleDelete(id)}/>
          })}
        </div>
      </div>
    </>
  )
}