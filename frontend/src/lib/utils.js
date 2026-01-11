import { useEffect, useState } from "react";
import api from "./axios";

export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}



// custom hook
// GET
export function useFetchTable(endpoint, params = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const config = { signal: controller.signal };
        if (params) config.params = params; // masukkan params ke config

        const res = await api.get(endpoint, config);
        setData(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error, setData };
}



//POST
export function usePostItem(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postItem = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(endpoint, payload);
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postItem, data, loading, error };
}

// PUT
export function usePutItem(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateItem = async (id, payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put(`${endpoint}/${id}`, payload);
      setData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateItem, data, loading, error };
}

// DELETE
export function useDeleteItem(endpoint) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`${endpoint}/${id}`);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, loading, error };
}

