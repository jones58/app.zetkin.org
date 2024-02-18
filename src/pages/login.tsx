/* eslint-disable no-console */
import { GetServerSideProps } from 'next';

import { stringToBool } from '../utils/stringUtils';

//TODO: Create module definition and revert to import.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Z = require('zetkin');

export const getServerSideProps: GetServerSideProps = async (context) => {
  const z = Z.construct({
    clientId: process.env.ZETKIN_CLIENT_ID,
    clientSecret: process.env.ZETKIN_CLIENT_SECRET,
    ssl: stringToBool(process.env.ZETKIN_USE_TLS),
    zetkinDomain: process.env.ZETKIN_API_DOMAIN,
  });

  Object.entries(process.env).forEach((keyAndVal) => console.log(keyAndVal));
  const url = new URL(process.env.VERCEL_URL || 'http://localhost:3000');
  const protocol = url.protocol;
  const host = url.host;
  //const protocol = process.env.ZETKIN_APP_PROTOCOL;
  //const host = process.env.VERCEL_URL;

  let scopes;
  const { level } = context.query;
  if (level && typeof level === 'string') {
    if (parseInt(level) > 1) {
      scopes = [`level${level}`];
    }
  }

  return {
    redirect: {
      destination: z.getLoginUrl(`${protocol}://${host}/`, scopes),
      permanent: false,
    },
  };
};

export default function NotUsed(): null {
  return null;
}
