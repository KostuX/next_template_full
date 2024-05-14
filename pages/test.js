import DefaultLayout from "../layouts/default";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../config/session/session_config";
import React from "react";
import {Button} from "@nextui-org/react";



export default function Home({props}) {

  async function test(data){
    
   

    
    let endpoint = "/api/test_api";
    let api_data = { data:data };

    let response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(api_data),
      headers: { "Content-type": "application/json" },
    });
    let res = await response.json();
    console.log(res)
  }
  return (
    <DefaultLayout>
      <div className="justify-between h-full text-center ">
        <div className="border  m-5  border-theme_secondary">Test</div>

        <span className="grid grid-cols-2 gap-4  m-3 h-56 ">
          <span className="border  border-theme_secondary">
          <Button size="sm" onPress={(e)=>{
            test("Test Log")
          }}>
        Read Log
      </Button> 
          </span>

          <span className="border  border-theme_secondary">Right Panel</span>
        </span>
      </div>
    </DefaultLayout>
  );
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {

    return {
      props: {  },
    };
  },

  ironOptions
);
