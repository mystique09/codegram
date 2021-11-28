import styles from "./index.module.css"
import Link from "next/link";
import {
  useState
} from 'react';
import {
  BiMenu,
  BiX
} from "react-icons/bi";

import {
  useAppSelector,
  useAppDispatch
} from "@/app/hooks";

import {
  logout,
  selectAuth,
  update
} from "@/features/auth/auth_slice";
import {
  useRouter
} from "next/router";

function Navbar() {
  const [isMenuActive,
    setIsMenuActive] = useState(false);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST"
    });
    const message = await response.json();
    dispatch(logout());

    await router.replace(router.pathname, "/auth");
    await router.push("/auth");
  }

  return <header className={styles.nav_container}>
    <h1 className={styles.logo}><Link href="/"><a>Codegram</a></Link></h1>
    <ul className={styles.nav_links}>

      <li onClick={()=> setIsMenuActive(false)}>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </li>

      { !auth.user ? 
      (
        <>
    <li onClick={()=> setIsMenuActive(false)}>
          <Link href="/auth/">
            <a>Sign In</a>
          </Link>
    </li>
    <li className={styles.btn_medium} onClick={()=> setIsMenuActive(false)}>
          <Link href="/auth/register">
            <a>Sign Up</a>
          </Link>
    </li>
    </>
  ):
    (
      <>
      <li onClick={()=> setIsMenuActive(false)}>
          <Link href="/profile/">
            <a>Profile</a>
          </Link>
        </li>
      <button className={styles.logout_btn} type="button" onClick={handleLogout}>Log Out</button> 
      </>
    )
    }
  </ul>
    <div className={styles.nav_menu} onClick={()=>
    setIsMenuActive(!isMenuActive)}>
      { !isMenuActive ? (<BiMenu size={40} />):
    (<BiX size={40} />)
    }
  </div>
      <ul className={`${styles.nav_links_mobile} ${!isMenuActive ? styles.hide: ''}`}>
        <li onClick={()=> setIsMenuActive(false)}>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </li>
        { !auth.user ? 
        (
        <>
      <li onClick={()=> setIsMenuActive(false)}>
            <Link href="/auth/">
              <a>Sign In</a>
            </Link>
          </li>
      <li className={styles.btn_medium} onClick={()=> setIsMenuActive(false)}>
            <Link href="/auth/register">
              <a>Sign Up</a>
            </Link>
          </li> 
          </>
    ):
    (
      <>
      <li onClick={()=> setIsMenuActive(false)}>
            <Link href="/profile/">
              <a>Profile</a>
            </Link>
          </li>
      <button
        className={styles.logout_btn} type="button" onClick={handleLogout}>Log Out</button> 
      </>
    )
    }
  </ul>
</header>
}

export default Navbar;