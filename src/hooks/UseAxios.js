import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api";
// axios.defaults.baseURL = "https://qatbackend.mascenter.xyz/api";
// /
//  fixed :
//   - no need to JSON.stringify to then immediatly do a JSON.parse
//   - don't use export defaults, because default imports are hard to search for
//   - axios already support generic request in one parameter, no need to call specialized ones
// /

export const useAxios = () => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const operation = async (params) => {
    try {
      // setLoading(true);
      const result = await axios.request(params);
      setResponse(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //     fetchData(axiosParams);
  // }, []);

  return { response, error, loading, operation, setLoading };
};

export default useAxios;