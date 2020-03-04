import React from 'react';

const Welcome = () => (
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="jumbotron">
          <h1 className="display-4">Welcome!</h1>

          <p className="lead">
            A fullstack web application with <mark>React</mark> and{' '}
            <mark>GraphQL</mark> integration.
          </p>
          <hr className="my-4" />
          <p className="text-muted">
            <small>
              Major dependencies: <mark>JavaScript</mark>, <mark>React</mark>,{' '}
              <mark>GraphQL</mark> and <mark>MongoDB</mark>
            </small>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Welcome;
