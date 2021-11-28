import connectDB from "@/utils/connect_db";
import Post from "@/models/post";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";

export interface PostType {
  _id?: string,
  author: {
    _id: string,
    username: string
  },
  description: string,
  created_at: Date,
  image: string
}

export const Card = ({author, description, created_at, image}: PostType) => {
  return <div className={styles.card_container}>
    <div className="head">
      <Link href={`/profile/${author._id}`}><a className={styles.profile}>{author.username}</a></Link>
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

const Posts = ({ posts }: any) => {
  const postsMap = JSON.parse(posts).map((post: PostType) => (
    <Card key={post._id} 
    author={post.author}
    image={post.image}
    description={post.description}
    created_at={post.created_at}
    />  
    ));
  
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
  const posts = await Post.find().populate('author', 'username _id');
  
  return {
    props: {
      posts: JSON.stringify(posts)
    }
  }
}

export default Posts;