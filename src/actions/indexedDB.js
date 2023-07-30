let db;
const dbName = "hikingDb";

const request = window.indexedDB.open(dbName, 1);

request.onerror = function (event) {
    console.error("Error opening database:", event.target.errorCode);
};

request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database opened successfully!");
};

// This event is triggered if the database doesn't exist or needs to be updated
request.onupgradeneeded = function (event) {
    db = event.target.result;
    const photos = db.createObjectStore("photo", { keyPath: "_id", autoIncrement: false });
};


function dbAddPhoto(data) {
    const transaction = db.transaction(["photo"], "readwrite");
    const photos = transaction.objectStore("photo");

    const request = photos.add(data);

    request.onsuccess = function (event) {
        console.log("Photo added successfully!");
    };

    request.onerror = function (event) {
        console.error(`Error adding Photo: ${data._id}`, event.target.error);
    };
}

// Example usage:
//   const dataToAdd = { name: "John Doe", age: 30 };
//   addData(dataToAdd);

const dbGetPhoto = async (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["photo"], "readonly");
        const photos = transaction.objectStore("photo");

        const request = photos.get(id);

        request.onsuccess = async (event) => {
            const data = event.target.result;
            if (data) {
                // console.log("Photo found: " + data._id);
                resolve(data);
            } else {
                resolve(null);
                // reject(new Error("Photo not found: " + id));
            }
        };

        request.onerror = async (event) => {
            reject(new Error("Error retrieving photo: " + event.target.error));
        };
    })
}

function dbDeletePhoto(id) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["photo"], "readwrite");
      const photos = transaction.objectStore("photo");
  
      const request = photos.delete(id);
  
      transaction.oncomplete = function(event) {
        resolve(); // Resolve the promise when the transaction is complete (data deleted successfully)
      };
  
      transaction.onerror = function(event) {
        reject(new Error("Error deleting data: " + event.target.error)); // Reject with an error in case of an error during the transaction
      };
  
      request.onerror = function(event) {
        reject(new Error("Data not found or error deleting data: " + event.target.error)); // Reject with an error if data is not found or there's an error during the delete request
      };
    });
  }

// Example usage:
//   getData(1);

// db.close();

export {
    dbGetPhoto,
    dbAddPhoto,
    dbDeletePhoto
}