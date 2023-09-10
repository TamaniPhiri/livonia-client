import { useParams } from "react-router-dom";

const ClientTransactions = () => {
  const { id } = useParams();
  console.log(id);
  return <div>ClientTransactions</div>;
};

export default ClientTransactions;
