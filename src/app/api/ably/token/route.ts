import { getEnvVariable } from "@/lib/env";
import * as Ably from "ably";

export async function GET() {
  const client = new Ably.Realtime(getEnvVariable("ABLY_API_KEY"));
  let tokenRequest = undefined;

  try {
    client.auth.createTokenRequest(
      { clientId: "0TAqrQ" },
      (err, tokenRequestData) => {
        if (err) throw err;

        tokenRequest = tokenRequestData;
      },
    );

    return Response.json(tokenRequest);
  } catch (error) {
    return Response.json("Error creating token request");
  }
}
