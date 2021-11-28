import redirectTo from "@/helpers/redirect_to";
import { GetServerSideProps } from "next"

const Profile = () => {
  return <h1>Profile</h1>
}

export const getServerSideProps = async (context) => {

  if(!context.req.cookies?.session_id) {
    return redirectTo("/auth");
  }

  return {
    props: {}
  }
}

export default Profile;