import DefaultLayout from "../layouts/default";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../config/session/session_config";
import React, { useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import {
  CredentialsSignInButton,
  GithubSignInButton,
  GoogleSignInButton,
} from "../components/authButtons";

export default function Home({ props }) {
  const [textField, setTextField] = useState([""]);
  let tests_btn = ["Test Log", "Test db", "Test JWT", "Test Email"];
  async function test(data) {
    let endpoint = "/api/test_api";
    let api_data = { data: data };

    let response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(api_data),
      headers: { "Content-type": "application/json" },
    });
    let res = await response.json();

    setTextField(res.data);
  }
  return (
    <DefaultLayout>
      <div className="justify-between h-full text-center ">
        <div className="border  m-5  border-theme_secondary">Test</div>

        <span className="grid grid-cols-2 gap-4  m-3 h-56 ">
          <span className="border border-theme_secondary">
            <span className="grid grid-cols-1 gap-4 m-3 ">
              {tests_btn.map((item, index) => (
                <Button
                  key={index}
                  size="sm"
                  onPress={(e) => {
                    test(item);
                  }}
                >
                  {item}
                </Button>
              ))}

              <span className="border border-theme_secondary">
                OAuth
                <GoogleSignInButton />
                <GithubSignInButton />
                <CredentialsSignInButton />
              </span>
            </span>
          </span>

          <span className="border  border-theme_secondary">
            <Card>
              <CardBody>
                {textField.map((e, index) => (
                  <p key={index}>{e}</p>
                ))}
              </CardBody>
            </Card>
          </span>
        </span>
      </div>
    </DefaultLayout>
  );
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {},
    };
  },

  ironOptions
);
