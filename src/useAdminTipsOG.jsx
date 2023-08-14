import useSWR from 'swr';

const useAdminTips = () => {
  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const { data, error } = useSWR(
    'https://data.cityofnewyork.us/resource/8q69-4ke5.json?status=Open&descriptor=Graffiti',
    fetcher
  );

  return {
    data,
    error,
    isLoading: !data && !error,
  };
};

export default useAdminTips;
