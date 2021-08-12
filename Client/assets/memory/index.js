const fetchMemory = async () => {
  const path = window.location.pathname;
  const memoryId = path.substr(path.lastIndexOf('/') + 1);

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
    document.getElementById('title').textContent = result.title;
    document.getElementById('storyText').textContent = result.story;
    document.getElementById('memoryDashboard').style.backgroundImage = `url(${result.picture || '/svgs/fly.svg'} )`;
    document.getElementById('date').textContent = new Date(result.createdAt).toDateString();
    document.getElementById('memoryEditLink').href = `/memory/update/${memoryId}`;
  }
};

fetchMemory();
