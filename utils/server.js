export const serverSideFetch = (store, renderProps) => {
  const { dispatch } = store;
  const { components } = renderProps;

  const filteredComponents = components.filter((component) => {
    return component && component.reduxAction;
  });

  if (filteredComponents.length > 0) {
    const promises = filteredComponents.map(({ reduxAction }) => {
      return dispatch(reduxAction(store, renderProps));
    });

    return Promise.all(promises);
  }

  return Promise.resolve();
};
