import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {
  if(!context.req.cookies?.session_id) {
    return {
      redirect: {
        destination: "/auth",
        statusCode: 301
      }
    }
  }
  return {
    props: {}
  }
}

const Settings = () => {
  return <h1>Settings</h1>
}

export default Settings;