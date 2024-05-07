import DefaultLayout from "../layouts/default";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../config/session/session_config";
export default function Home({ data }) {
  return (
    <DefaultLayout>
      <div className="justify-between h-full text-center ">
        <div className="border  m-5  border-theme_secondary">Top Center</div>

        <span className="grid grid-cols-2 gap-4  m-3 h-56 ">
          <span className="border  border-theme_secondary">Left Panel</span>

          <span className="border  border-theme_secondary">Right Panel</span>
        </span>
      </div>
    </DefaultLayout>
  );
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    let endpoint = "http:/localhost:3000/api/hello";
    let api_data = { data: "test api" };

    let response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(api_data),
      headers: { "Content-type": "application/json" },
    });
    let res = await response.json();
    let data = res;

    return {
      props: { data },
    };
  },

  ironOptions
);
