import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector
} from "@/app/hooks";
import {
  login, selectAuth
} from "@/features/auth/auth_slice";
import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import redirectTo from "@/helpers/redirect_to";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector(selectAuth);

  const [userState, setUserState] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...userState})
    });
    
    const data = await res.json();
    
    if(res.status === 200) {
      dispatch(login({
        user: data.user
      }));
      router.replace(router.pathname, "/posts");
      router.push("/posts");
    }else{
      setError(data.error);
      setTimeout(() => {
        setError("");
        setLoading(false);
      }, 1500);
    }
  };
  
  const handleChange = (e) => {
    setUserState({
      ...userState,
      [e.target.id]: e.target.value
    });
  };
  
  return (
  <div className={styles.container}>
    <Head>
      <title>Codegram - Sign In</title>
    </Head>
    <h1>Sign In</h1>
    <main className={styles.form_container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Enter your username" value={userState.username} onChange={handleChange} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" placeholder="Enter your password" value={userState.password} onChange={handleChange} />
        </div>
        { error ? (<p className={styles.error}>{error}</p>) : <p></p> }
        <div className={styles.container_bottom}>
          <button disabled={isLoading & "disabled"} className={`${!isLoading ? styles.submit_btn : styles.loading_btn}`} type="submit">Sign In</button>
          <Link href="/forgot-password">
            <a className={styles.forgot}>Forgot password?</a>
          </Link>
        </div>
        <p className={styles.note}>Don{`'`}t have an account? <Link href="/auth/register"><a>Create</a></Link></p>
      </form>
    </main>
  </div>)
}

export const getServerSideProps  = async (context) => {

  if(context.req.cookies?.session_id){
    return redirectTo("/posts");
  }
  return {
    props: {}
  }
}

export default SignIn;