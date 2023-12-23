import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepository = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    // ...
  });
  console.log(data);
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log(data.repository.reviews.pageInfo.endCursor);
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepository;
