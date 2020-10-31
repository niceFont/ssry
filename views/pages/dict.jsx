import React from 'react';
import fetch from 'isomorphic-fetch';

const Dict = ({ list }) => {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <h1>
        React:
      </h1>
      {count}
      <button type="button" onClick={() => setCount(count + 1)}>Upvote</button>
      {list && list.map((item) => <div>{item.definition}</div>)}
    </>
  );
};

Dict.getInitialProps = async () => {
  try {
    const response = await fetch('http://api.urbandictionary.com/v0/define?term=react');
    if (!response.ok) throw response.statusText;
    const { list } = await response.json();
    return {
      list,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {};
  }
};

export default Dict;
