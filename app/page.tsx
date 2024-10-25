"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import styles from "./page.module.css";

export default function Page() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/cities");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contents}>
        <div className={styles.textContainer}>
          <Typography variant="h2" sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}>
            Weathering With You
          </Typography>
          <button
            className={styles.getStartedButton}
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>

      <video
        src="/Videos/mountain.mp4"
        autoPlay
        loop
        muted
        className={styles.video}
      />
    </div>
  );
}
