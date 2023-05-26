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
        latestSubmissionCount: "",
        latestSubmissionTime: ""
    });

    const convertUnixTimestampToDate = (unixTimestamp)=>{
        const dateTime = new Date(unixTimestamp * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = dateTime.getFullYear();
        const month = months[dateTime.getMonth()];
        const date = dateTime.getDate();
        const requiredDate = date + '/' + month + '/' + year;
        return requiredDate;
    }

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_LEETCODE_API_URL}/${id}`).then((response)=>{
            if(response.data.status === "success"){
                const submissions = response.data.submissionCalendar;
                const latestSubmissionCount = submissions[Object.keys(submissions)[Object.keys(submissions).length - 1]];
                const latestSubmissionTime = convertUnixTimestampToDate(Object.keys(submissions)[Object.keys(submissions).length - 1]);

                setUserDetails(
                {...UserDetails, 
                    totalSolved: response.data.totalSolved,
                    easySolved: response.data.easySolved,
                    mediumSolved: response.data.mediumSolved,
                    hardSolved: response.data.hardSolved,
                    hardSolved: response.data.hardSolved,
                    acceptanceRate: response.data.acceptanceRate,
                    latestSubmissionCount: latestSubmissionCount,
                    latestSubmissionTime: latestSubmissionTime
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
                <div className={styles.easySolved}>Easy Solved: &emsp;{userDetails.easySolved && <span>{userDetails.easySolved}/{userDetails.totalSolved}</span>}</div>
                <div className={styles.mediumSolved}>Medium Solved: &emsp; {userDetails.mediumSolved && <span>{userDetails.mediumSolved}/{userDetails.totalSolved}</span>}</div>
                <div className={styles.hardSolved}>Hard Solved: &emsp; {userDetails.hardSolved && <span>{userDetails.hardSolved}/{userDetails.totalSolved}</span>}</div>
                <div className={styles.acceptanceRate}>Acceptance Rate: &emsp; {userDetails.acceptanceRate && <span>{userDetails.acceptanceRate}%</span>}</div>
                <div className={styles.todaySubmissionCount}>Latest Submission: &emsp;
                    <span className={styles.submissionCount}>{userDetails.latestSubmissionCount}</span> {userDetails.latestSubmissionTime && <span className={styles.submissionTime}>({userDetails.latestSubmissionTime})</span>}</div>
            </div>
        </>
    )
}