import { gql } from "@apollo/client";
import client from "client";
import { BlockRenderer } from "components/BlockRenderer/BlockRenderer";
import { cleanAndTransformBlocks } from "utils/cleanAndTransformBlocks";

export default function Home(props) {
  console.log("PROPS: ", props);
  return <div>
    <BlockRenderer blocks={props.blocks} />
  </div>;
}


export const getStaticProps = async () => {
  const {data} = await client.query({
    query: gql`
      query NewQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocks(postTemplate: false)
          }
        }
      }
    `,
  }) 
  return {
    props: {
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
    },
  };
};