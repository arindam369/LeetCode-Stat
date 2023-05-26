import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import {FaRegWindowClose} from "react-icons/fa";
import Link from "next/link";

export default function UserDetails({id, onDelete}){
    const [userDetails, setUserDetails] = useState({
        totalSolved: "",
        easySolved: "",
        mediumSolved: "",
        hardSolved: "",
        acceptanceRate: "",
        todaySubmissionCount: ""
    });

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_LEETCODE_API_URL}/${id}`).then((response)=>{
            if(response.data.status === "success"){
                const submissions = response.data.submissionCalendar;
              setUserDetails(
                {...UserDetails, 
                    totalSolved: response.data.totalSolved,
                    easySolved: response.data.easySolved,
                    mediumSolved: response.data.mediumSolved,
                    hardSolved: response.data.hardSolved,
                    hardSolved: response.data.hardSolved,
                    acceptanceRate: response.data.acceptanceRate,
                    todaySubmissionCount: submissions[Object.keys(submissions)[Object.keys(submissions).length - 1]]
                })
            }
          }).catch((err)=>{
            console.log(err);
          })
    }, [])

    return (
        <>
            <div className={styles.userDetailsBox}>
                <FaRegWindowClose className={styles.closeIcon} onClick={()=>{onDelete(id)}}/>
                <div className={styles.userIdDiv}>
                    <Link className={styles.userId} href={`https://leetcode.com/${id}`} target="_blank">{id}</Link>
                </div>
                <div className={styles.easySolved}>Easy Solved: &emsp;{userDetails.easySolved}/{userDetails.totalSolved}</div>
                <div className={styles.mediumSolved}>Medium Solved: &emsp;{userDetails.mediumSolved}/{userDetails.totalSolved}</div>
                <div className={styles.hardSolved}>Hard Solved: &emsp;{userDetails.hardSolved}/{userDetails.totalSolved}</div>
                <div className={styles.acceptanceRate}>Acceptance Rate: &emsp;{userDetails.acceptanceRate}%</div>
                <div className={styles.todaySubmissionCount}>Today Submission Count: &emsp;{userDetails.todaySubmissionCount}</div>
            </div>
        </>
    )
}