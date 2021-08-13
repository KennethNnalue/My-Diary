
const path = window.location.pathname;
const memoryId = path.substr(path.lastIndexOf('/') + 1);

const DeleteButton = document.getElementById('memoryDeleteLink');

const deleteMemory = async (event) => {
  event.preventDefault();
/**
        * call our login API
*/

  const response = await fetch(`${window.location.origin}/api/v1/memories/${memoryId}`, {
    method: 'DELETE',
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
    await cuteToast({
      type: 'success', // or 'info', 'error', 'warning'
      message: result.message,
      timer: 2500
    });

    window.location.href = '/dashboard';
  }
};

DeleteButton.addEventListener('click', deleteMemory);
