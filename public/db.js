let db;
let workoutVersion;

// Create a new db request for a "workout" database.
const request = indexedDB.open('workoutDB', workoutVersion || 21);

request.onupgradeneeded = function (e) {
  console.log('Upgrade needed in IndexDB');

  const { oldVersion } = e;
  const newVersion = e.newVersion || db.version;

  console.log(`DB Updated from version ${oldVersion} to ${newVersion}`);

  db = e.target.result;

  if (db.objectStoreWorkout.length === 0) {
    db.createObjectStore('workoutStore', { autoIncrement: true });
  }
};

request.onerror = function (e) {
  console.log(`Woops! ${e.target.errorCode}`);
};

function checkDatabase() {
  console.log('check db invoked');

  // Open a workout on your workoutStore db
  let workout = db.workout(['workoutStore'], 'readwrite');

  // access your workoutStore object
  const store = workout.objectStore('workoutStore');

  // Get all records from store and set to a variable
  const getAll = workoutStore.getAll();

  // If the request was successful
  getAll.onsuccess = function () {
    // If there are items in the store, we need to stats add them when we are back online
    if (getAll.result.length > 0) {
      fetch('/api/workout/stats', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          // If our returned response is not empty
          if (res.length !== 0) {
            // Open another workout to workoutStore with the ability to read and write
            workout = db.workout(['workoutStore'], 'readwrite');

            // Assign the current store to a variable
            const currentStore = workout.objectStore('workoutStore');

            // Clear existing entries because our stats add was successful
            currentStore.clear();
            console.log('Clearing store 🧹');
          }
        });
    }
  };
}

request.onsuccess = function (e) {
  console.log('success');
  db = e.target.result;

  // Check if app is online before reading from db
  if (navigator.onLine) {
    console.log('Backend online! 🗄️');
    checkDatabase();
  }
};

const saveRecord = (record) => {
  console.log('Save record invoked');
  // Create a workout on the workoutStore db with readwrite access
  const workout = db.workout(['workoutStore'], 'readwrite');

  // Access your workoutStore object store
  const store = workout.objectStore('workoutStore');

  // Add record to your store with add method.
  store.add(record);
};

// Listen for app coming back online
window.addEventListener('online', checkDatabase);
