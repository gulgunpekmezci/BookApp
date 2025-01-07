import axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react';

const initialData = {
  data: [],
  totalResult: 0,
  status: true,
  pageNo: 1,
  totalPages: 1,
};

const usePagination = (searchText: string)=> {
  const [initialLoader, setInitialLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData.data);
  const [totalResult, setTotalResult] = useState(initialData.totalResult);
  const [pageNo, setPageNo] = useState(initialData.pageNo);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Fetch data for a given page
  const fetchData = async (q: string, page: number, perPage = 16) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json`, {
        params: {q: q, page: page, limit: perPage},
      });
      const result = {
        data: response?.data?.docs,
        totalResult: response?.data?.numFound,
        status: true,
        pageNo: page,
        totalPages: Math.ceil(response?.data?.numFound / perPage),
      };

      if (result.status) {
        if (result.totalResult === 0) {
          setData([]);
        } else {
          setData(page === 1 ? result.data : [...data, ...result.data]);
        }
        setTotalResult(result.totalResult);
        setPageNo(result.pageNo);
        setTotalPages(result.totalPages);
      } else {
        console.error('Failed to fetch data');
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
      setInitialLoader(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchText, pageNo);
  }, []);

  // Pull-to-refresh
  const handleRefresh = useCallback((q?: string) => {
    setRefreshing(true);
    fetchData(q ? q : searchText, 1); // Refresh from the first page
  }, []);

  // Load more data
  const loadMore = () => {
    if (!loadingMore && pageNo < totalPages) {
      setLoadingMore(true);
      fetchData(searchText, pageNo + 1);
    }
  };


  return {
    data,
    totalResult,
    refreshing,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
    loading,
    hasError,
  };
};

export default usePagination;
