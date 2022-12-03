import Layout from "../components/Layout";
import ResponseHTTP404 from "../components/ResponseHTTP404";

function responseHTTP404() {
  return (
    <Layout title="Página não encontrada">
      <ResponseHTTP404 />
    </Layout>
  );
}

export default responseHTTP404;
