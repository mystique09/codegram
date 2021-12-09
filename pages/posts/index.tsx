import connectDB from "@/utils/connect_db";
import Post from "@/models/post";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import redirectTo from "@/helpers/redirect_to";
import { RiUserFollowLine } from "react-icons/ri"
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
    <div className={styles.head}>
      <Link href="/profile/[slug]" as={`/profile/${author._id}`}><a className={styles.username}>@{author.username}</a>
      </Link>
      <button className={styles.follow}><RiUserFollowLine/></button>
    </div>
    <div className={styles.image_container}>
      <Image src={image}
        width={240}
        height={240}
        layout="responsive"
        alt={description}
        priority="true"
        />
    </div>
    <span className={styles.date}>{created_at}</span>
    <p className={styles.description}>
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

    const addPost  = async (e) => { 
      e.preventDefault();
    }
  
  return <>
    <a href="#my-modal" class="btn btn-primary">Add New Post</a> 
    <div id="my-modal" class="modal">
      <div class="modal-box">
      <p>Add new post</p> 
      <form method="POST" onSubmit={addPost}>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Title</span>
        </label> 
        <input type="text" placeholder="The Galaxy" class="input input-primary input-bordered" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Description</span>
        </label> 
        <input type="text" placeholder="Description" class="input input-primary input-bordered" />
      </div>
      <button class="btn btn-primary mt-5" type="submit">Add</button>
      </form>
      <div class="modal-action">
        <a href="/posts#" class="btn">Close</a>
    </div>
  </div>
</div>
  {postsMap.length > 0 ? postsMap : <p>No available post</p>}
  </>
}

export const getServerSideProps = async (context) => {
  if(!context.req.cookies?.session_id)return redirectTo("/auth");
  
  await connectDB();
  const posts = await Post.find().populate('author', 'username _id');
  
  return {
    props: {
      posts: JSON.stringify(posts)
    }
  }
}

export default Posts;