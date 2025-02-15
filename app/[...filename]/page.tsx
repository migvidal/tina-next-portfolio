import React from "react";
import client from "../../tina/__generated__/client";
import ClientPage from "./client-page";
import Layout from "../../components/layout/layout";
import { cookies } from "next/headers";

export default async function Page({
                                     params
                                   }: {
  params: { filename: string[] };
}) {
  const locale = cookies().get("NEXT_LOCALE")?.value || "en";
  const data = await client.queries.page({
    relativePath: `${locale}/${params.filename}.md`
  });

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data}></ClientPage>
    </Layout>
  );
}

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  const paths = pages.data?.pageConnection.edges.map((edge) => ({
    filename: edge.node._sys.breadcrumbs
  }));

  return paths || [];
}
