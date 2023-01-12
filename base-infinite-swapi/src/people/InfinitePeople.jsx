import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from 'react-query';
import { Person } from './Person';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isSuccess, isLoading, isError } = useInfiniteQuery(
    'sw-poeple',
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  if (isLoading) return <p>Loading..</p>;
  if (isError) return <p>error</p>;
  // TODO: get data for InfiniteScroll via React Query
  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {data.pages.map((pageData, i) =>
        pageData.results.map((person, index) => (
          <Person key={person.name} name={person.name} hairColor={person.hair_color} eyeColor={person.eye_color} />
        ))
      )}
    </InfiniteScroll>
  );
}
