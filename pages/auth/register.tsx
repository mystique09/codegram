import styles from "./index.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const { session_id } = context.req.cookies;
  
  if(session_id){
    return {
        redirect: {
          destination: "/posts",
          status: 302
        }
    }
  }
  return {props: {}}
}

const Register = () => {
  const [userState, setUserState]: [{username: string, email: string, password: string}, Function] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  const [error, setError]: [string, Function] = useState("");
  
  const router = useRouter();
  
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setUserState({
      ...userState,
      [id]: value
    });
  }
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const newUser = userState;
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newUser)
    });
    const data = await response.json();
    
    if(response.status === 200) {
      router.replace(router.pathname, "/auth");
      router.push("/auth");
    }else{
      setError(data.error);
      setTimeout(()=> setError(""), 1500);
    }
  }
  
  return <div className={styles.container}>
    <Head>
      <title>Codegram - Sign Up</title>
    </Head>
    <h1>Sign Up</h1>
    <main className={`${styles.form_container} ${styles.containerResize}`}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Enter your username" value={userState.username} onChange={handleChange} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Enter your email" value={userState.email} onChange={handleChange} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Enter your password" value={userState.password} onChange={handleChange} />
        </div>
        <p>{error}</p>
        <div className={`${styles.container_bottom} justify-center align-center`}>
          <button className="self-center" type="submit">Sign Up</button>
        </div>
        <p className={styles.note}>
        Already have an account? 
        <Link href="/auth">
        <a>Sign In</a>
        </Link>
        </p>
      </form>
    </main>
  </div>
}

export default Register;