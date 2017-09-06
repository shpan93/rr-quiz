export const serverSideFetch = (store, renderProps) => {
  const { dispatch } = store;
  const { components } = renderProps;

  const filteredComponents = components.filter((component) => {
    return component && component.reduxAction;
  });

  let result = Promise.resolve;
  if (filteredComponents.length > 0) {
    const promises = filteredComponents.map(({reduxAction}) => {
      return dispatch(reduxAction(store, renderProps));
    });

    result = () => {
      return Promise.all(promises);
    };
  }
  return result();
};
