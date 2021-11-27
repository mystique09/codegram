import connectDB from "@/utils/connect_db";
import Post from "@/models/post";
import Link from "next/link";
import Image from "next/image";
import styles from "../index.module.css";

export const Card = ({author, description, created_at, id, image}: {author: string, description: string, created_at: Date, id: string, image: string}) => {
  return <div className="card_container">
    <div className="head">
      <Link href={`/profile/${id}`}><a className={styles.profile}>{author}</a></Link>
      <span className="datea">{created_at}</span>
    </div>
    <div className="image_container">
      <Image src={image}
        width={240}
        height={240}
        layout="responsive"
        alt={description}
        />
    </div>
    <p className="description">
      {description}
    </p>
  </div>
}

const Posts = ({ posts }) => {
  const postsMap = JSON.parse(posts).map(post => (<li key={post._id}>{post.description}</li>));
  
  return <>
    <h1>Test, list of all posts</h1>
    <ul>
        {postsMap}
    </ul> 
  </>
}

export const getServerSideProps = async (context) => {
  const {
    session_id
  } = context.req.cookies;

  if (!session_id) {
    return {
      redirect: {
        destination: "/auth",
        status: 302
      }
    }
  }
  
  await connectDB();
  const posts = await Post.find();
  
  return {
    props: {
      posts: JSON.stringify(posts)
    }
  }
}

export default Posts;