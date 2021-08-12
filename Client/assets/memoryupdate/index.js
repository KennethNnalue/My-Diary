let photoUrl;

const path = window.location.pathname;
const memoryId = path.substr(path.lastIndexOf('/') + 1);

const fetchMemory = async () => {
  /** *
        * fetch a particular memory by id
        */
  const response = await fetch(`${window.location.origin}/api/v1/memories/${memoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    }
  });

  const result = await response.json();

  if (response.status === 401) {
    /**
         * display a message to user when their session expires
         */
    await cuteToast({
      type: 'error', // or 'info', 'error', 'warning'
      message: 'Session expired!',
      timer: 2500
    });

    /**
           * redirect user to login page
           */
    window.location.href = '/login';
  }

  if (response.status === 403) {
    await cuteToast({
      type: 'error', // or 'info', 'error', 'warning'
      message: 'Access denied!',
      timer: 2500
    });
    window.location.href = '/dashboard';
  }

  if (response.ok) {
    document.getElementById('title').value = result.title;
    document.getElementById('story').value = result.story;
    document.getElementById('mood').value = result.mood;
    photoUrl = result.picture;
  }
};

fetchMemory();

let pictureUrl;
const pictureInput = document.getElementById('myfile');

const uploadFile = (event) => {
  const reader = new FileReader();

  reader.onload = () => {
    pictureUrl = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};

const updateMemory = async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const mood = document.getElementById('mood').value;
  const story = document.getElementById('story').value;

  /**
   * upload picture
   *
   */
  let uploadResponse;
  if (pictureUrl) {
    uploadResponse = await fetch(`${window.location.origin}/api/v1/image/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ picture: pictureUrl })
    });

    if (!uploadResponse.ok) {
      await cuteToast({
        type: 'error', // or 'info', 'error', 'warning'
        message: 'Image upload failed!',
        timer: 2500
      });
      return null;
    }
    await cuteToast({
      type: 'info', // or 'info', 'error', 'warning'
      message: 'Image uploaded!',
      timer: 2500
    });

    const imageUploadresult = await uploadResponse.json();
    photoUrl = imageUploadresult.url;
  }

  /**
     * call create memory API
  */

  const response = await fetch(`${window.location.origin}/api/v1/memories/${memoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      title,
      story,
      mood,
      picture: photoUrl || ''
    })
  });

  const result = await response.json();

  if (response.status === 422) {
    const errors = result.errors.title || result.errors.mood || result.errors.story;

    /**
       * User has made mistake in input & we will bounce him back
       */
    cuteAlert({
      type: 'error',
      title: 'Error!',
      message: errors[0].message,
      buttonText: 'Okay'
    });
  }

  if (response.status === 401) {
    /**
     * display a message to user when their session expires
     */
    await cuteToast({
      type: 'error', // or 'info', 'error', 'warning'
      message: 'Session expired!',
      timer: 2500
    });

    /**
       * redirect user to login page
       */
    window.location.href = '/login';
  }

  if (response.ok) {
    await cuteToast({
      type: 'success', // or 'info', 'error', 'warning'
      message: result.message,
      timer: 2500
    });

    window.location.href = `/memories/${result.memory.id}`;
  }
};

pictureInput.addEventListener('change', uploadFile);

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', updateMemory);
