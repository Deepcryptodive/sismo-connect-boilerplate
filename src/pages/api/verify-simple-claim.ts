// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SismoConnect, SismoConnectServerConfig, AuthType } from '@sismo-core/sismo-connect-server';
import { SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-react';

const sismoConnectConfig: SismoConnectServerConfig = {
  appId: "0x112a692a2005259c25f6094161007967",
  devMode: {
    enabled: true, 
  }
}

const sismoConnect = SismoConnect(sismoConnectConfig);

const claims = [{
  groupId: "0xe9ed316946d3d98dfcd829a53ec9822e",
}];

const signature = { message: "0x1234568" }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {

  const { response } = req.body;
  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(response, {
      claims,
      signature
    });
    console.log("Response verified:", result.response);
    res.status(200).send();
  } catch (e: any) {
    res.status(400).send();
  }
}
