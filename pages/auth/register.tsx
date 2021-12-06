import styles from "./index.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import redirectTo from "@/helpers/redirect_to";

export const getServerSideProps = async (context) => {
  if(context.req.cookies?.session_id){
    return redirectTo("/posts")
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
  const [isLoading, setLoading] = useState(false);
  
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
    setLoading(true);
    
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
      setTimeout(()=> {
        setError("");
        setLoading(false);
      }, 1500);
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
        { error ? (<p className={styles.error}>{error}</p>) : <p></p> }
        <div className={`${styles.container_bottom} justify-center align-center`}>
         <button disabled={isLoading & "disabled"} className={`${!isLoading ? styles.submit_btn : styles.loading_btn}`} type="submit">Sign Up</button>
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