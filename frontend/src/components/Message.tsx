import { useGetMessageQuery } from "../redux/slices/apiSlice";

const Message = () => {
  const { data, error, isLoading } = useGetMessageQuery();

  if (isLoading) return <h1>Loading...</h1>;
  // if (error) {return <h1>Error fetching data</h1>;}
  if (error) {
    console.log(error)
    return <h1>Error fetching data</h1>}

  return <h1>{data}</h1>;
};

export default Message;
