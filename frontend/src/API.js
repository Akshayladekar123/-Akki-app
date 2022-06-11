import axios from "axios";
const LOGIN_USER_KEY = "E_LIKE_LOGIN_USER_KEY";

var baseURL;
// if (
//   process.env.REACT_APP_ENVIRONMENT &&
//   process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
// ) {
//   baseURL = process.env.REACT_APP_API_BASE_URL;
// } else {
baseURL = "http://127.0.0.1:8000";
// }
// baseURL = "https://e-likes-backend.herokuapp.com/";
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.requireToken) {
      const user = localStorage.getItem(LOGIN_USER_KEY)
        ? JSON.parse(localStorage.getItem(LOGIN_USER_KEY))
        : null;
      config.headers.common["Authorization"] = user.token;
    }

    return config;
  },
  (err) => {
    console.error(err);
  }
);

export default class API {
  getPosts = async params => {
    try {
        const response = await api.get('/posts/', { params });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
  };
  addPost = async postBody => {
    const formData = new FormData();

    for (const key in postBody) {
        formData.append(key, postBody[key]);
    }

    try {
        const response = await api.post('/posts/add/', formData);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
  };
  deletePost = async id => {
    try {
        return await api.delete(`/posts/delete/${id}/`);
    } catch (error) {
        throw new Error(error);
    }
  };

  signUp = async (signUpBody) => {
    const formData = new FormData();

    for (const key in signUpBody) {
      formData.append(key, signUpBody[key]);
    }

    return api
      .post("/users/signup/", formData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    };

  signIn = async (signInBody) => {
    const formData = new FormData();
    for (const key in signInBody) {
      formData.append(key, signInBody[key]);
    }
    return api
      .post("/users/signin/", formData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  updateProfile = async (updateProfileBody, id) => {
		const formData = new FormData();
		for (const key in updateProfileBody) {
			formData.append(key, updateProfileBody[key]);
		}
    console.log(id);
		return api.put(`/users/update/${id}/`, formData, { requireToken: true });
	};

  getUsers = async (params = {}) => {
    const response = await api
      .get("/users/", {
        params,
        requireToken: true,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return response;
  };

  // likes
  addLike = async (receive_user_id) => {
    const formData = new FormData();
    formData.append("receive_user_id", receive_user_id);
    const savedLike = await api
      .post("/likes/add/", formData, {
        requireToken: true,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return savedLike;
  };

  // matches
  getMatches = async (params = {}) => {
    return api
      .get("/matches/", {
        params,
        requireToken: true,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  // chats
  getChats = (query) => {
    const { matchId, chatId } = query;
    return api
      .get("/chats/", {
        params: { match_id: matchId, chat_id: chatId },
        requireToken: true,
      })
      .then((response) => {
        response.data.results.reverse();
        return response.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  addChat = (chatBody) => {
    const { body, matchId } = chatBody;
    const formData = new FormData();

    formData.append("body", body);
    formData.append("match_id", matchId);

    return api
      .post("/chats/add/", formData, {
        requireToken: true,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}
