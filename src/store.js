import data from "./data";

function navigate(currentPostIndex, currentPhotoIndex, direction) {
  // Navigating within a post
  const nextPhotoIndex = currentPhotoIndex + direction;
  if (nextPhotoIndex in data.posts[currentPostIndex].photos) {
    return { postIndex: currentPostIndex, photoIndex: nextPhotoIndex };
  }

  // Navigating between posts
  const nextPostIndex = currentPostIndex + direction;
  if (nextPostIndex in data.posts) {
    const nextPost = data.posts[nextPostIndex];
    return {
      postIndex: nextPostIndex,
      photoIndex: direction < 0 ? nextPost.photos.length - 1 : 0,
    };
  }

  return { postIndex: currentPostIndex, photoIndex: currentPhotoIndex };
}

export const initialState = {
  postIndex: 0,
  photoIndex: 0,
};

export function reducer(state, { type }) {
  switch (type) {
    case "NAV_PREV":
      return {
        ...state,
        ...navigate(state.postIndex, state.photoIndex, -1),
      };
    case "NAV_NEXT":
      return {
        ...state,
        ...navigate(state.postIndex, state.photoIndex, +1),
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}
