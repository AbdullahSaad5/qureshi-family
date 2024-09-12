import { Layout } from "../components/layout/index";
import { ForceLayout } from "../components/charts/force-layout/index";
import styles from "../../styles/Home.module.css";

export default function LoanVis({ loans }) {
  return (
    <Layout alwaysFitScreen={true}>
      <ForceLayout />
    </Layout>
  );
}
