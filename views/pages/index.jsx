import React from 'react';

const App = () => {
  const [name, setName] = React.useState('');
  return (
    <div>
      <h1>
        Hello
        {' '}
        {name}
      </h1>
      <input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" />
    </div>
  );
};

export default App;
