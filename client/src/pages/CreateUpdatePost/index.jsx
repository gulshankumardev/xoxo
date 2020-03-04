import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-apollo';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import {
  CREATE_POST_MUTATION,
  UPDATE_POST_MUTATION,
} from '../../gql/mutations';
import { ALL_POSTS_QUERY } from '../../gql/queries';

const CreateUpdatePost = () => {
  const history = useHistory();
  const location = useLocation();
  const isCreate = location.pathname === '/create-post';

  // filter post for update
  const { postId } = useParams();
  let targetedPost = null;
  const { data: allPosts } = useQuery(ALL_POSTS_QUERY);

  if (postId && allPosts) {
    targetedPost = allPosts.posts.filter(post => post.id === postId);
  }

  // form fields states
  const [formState, setFormState] = useState(() => {
    return {
      title: targetedPost ? targetedPost[0].title : '',
      description: targetedPost ? targetedPost[0].description : '',
    };
  });

  // reset form on unmount
  useEffect(() => () => setFormState({ title: '', description: '' }), [postId]);

  // submit mutation hook
  const [handlePostMutation, { loading, error }] = useMutation(
    postId ? UPDATE_POST_MUTATION : CREATE_POST_MUTATION,
    {
      update: (store, { data }) => {
        try {
          const { posts } = store.readQuery({ query: ALL_POSTS_QUERY });
          const updatedData = {
            posts: [data.createPost, ...posts],
          };

          store.writeQuery({
            query: ALL_POSTS_QUERY,
            data: updatedData,
          });
        } catch (err) {
          history.push('/');
        }
      },
      onCompleted: () => {
        history.push('/');
      },
    },
  );

  const onFormSubmit = e => {
    e.preventDefault();
    const { title, description } = formState;
    handlePostMutation({
      variables: {
        ...(postId && { postId }),
        title,
        description,
      },
    });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h3>
            {isCreate ? 'Create Post' : 'Update Post'}
            {loading && <Loader right small />}
          </h3>
          <hr />

          {error && <Error msg={error.message} />}

          <form noValidate onSubmit={onFormSubmit}>
            <div className="form-group">
              <label htmlFor="title-field">Title</label>
              <input
                type="text"
                className="form-control"
                id="title-field"
                value={formState.title}
                name="title"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description-field">Description</label>
              <textarea
                rows="5"
                className="form-control"
                id="description-field"
                value={formState.description}
                name="description"
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-block btn-dark mt-4 mb-4"
              disabled={loading}
            >
              {targetedPost ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdatePost;
