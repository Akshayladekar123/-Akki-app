import API from '../../API';
import { fetchPostsAction, addPostAction, deletePostAction } from './actions';

const api = new API();

export const fetchPosts = params => {
    return dispatch => {
        return api
            .getPosts(params)
            .then(posts => {
                dispatch(fetchPostsAction(posts));
            })
            .catch(error => {
                alert('Failed to connect API: /posts/');
            });
    };
};

export const EDIT_POST = "EDIT_POST";
export const editPostAction = (post) => {
    return {
        type: EDIT_POST,
        payload: {
            post
        }
    };
};

export const editPost = (data={}, id) =>{
    return async (dispatch) => {
		return api
			.editPost(data, id)
			.then((response) => {
				dispatch(editPostAction(response));
			})
			.catch((error) => {
                console.log("put",error);
				// dispatch(updateProfileError(error.response.data));
			});
	};
// ************************GET -> post, Post-> UPdate -> return val

}

export const deletePost = id => {
    return dispatch => {
        return api
            .deletePost(id)
            .then(() => {
                dispatch(deletePostAction(id));
            })
            .catch(error => {
                alert('Failed to connect API to delete a post');
                console.log(error);
            });
    };
};

export const addPost = postBody => {
    const { name, body } = postBody;
    return dispatch => {
        // Validation
        if ( body === '') {
            alert('Please fill out name and body.');
            return false;
        }

        return api
            .addPost(postBody)
            .then(post => {
                dispatch(addPostAction(post));
            })
            .catch(error => {
                alert('Failed to connect API to add a post');
                console.log(error);
            });
    };
};
